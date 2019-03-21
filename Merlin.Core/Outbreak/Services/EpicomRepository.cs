using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Codes.Dtos;
using Microsoft.Extensions.Configuration;
using System.Xml.Linq;

namespace Merlin.Core.Outbreak.Services
{
    //TODO:  this can be done easier/cleaner with WCF generated proxies svcutil
    public class EpicomRepository 
    {
        private readonly MerlinReadContext readContext;
        private readonly MerlinReadStore readStore;
        private readonly IConfiguration config;

        public EpicomRepository(MerlinReadStore readStore, MerlinReadContext readContext, IConfiguration config) 
        {
            this.readStore = readStore;
            this.readContext = readContext;
            this.config = config;
        }

        public async Task<List<OutbreakEpicomDTO>> GetEpicomPosts() 
        {
            var client = await getClient();

            var currentPostsString = await GetEpicomPostsString();

            XDocument doc = XDocument.Parse(currentPostsString);

            XNamespace ns = doc.Root.GetDefaultNamespace();

            var postIdElements = doc.Descendants(ns + "Post_ID");

            var postIds = postIdElements.Select(d => d.Value).ToList();

            var postDateElements = doc.Descendants(ns + "Post_Date");

            var postDates = postDateElements.Select(d => d.Value).ToList();

            var titleElements = doc.Descendants(ns + "Title");

            var titles = titleElements.Select(d => d.Value).ToList();

            var forumElements = doc.Descendants(ns + "Forum");

            var forums = forumElements.Select(d => d.Value).ToList();

            var topicElements = doc.Descendants(ns + "Topic");

            var topics = topicElements.Select(d => d.Value).ToList();

            var authorElements = doc.Descendants(ns + "Author_Name");

            var authorNames = authorElements.Select(d => d.Value).ToList();

            var length = postIds.Count();

            List<OutbreakEpicomDTO> epicomPostList = new List<OutbreakEpicomDTO>();

            var forumNames = await GetForumNames();

            for (int i = 0; i < length; i++) {

                var postId = postIds[i];

                var forumId = forumNames
                                .Where(code => code.Description.Equals(forums[i]))
                                .Select(code => code.Code)
                                .FirstOrDefault();

                var topicsByForumId = await GetTopicsByForumId(Convert.ToInt32(forumId));

                var topicId = topicsByForumId
                                .Where(code => code.Description.Equals(topics[i]))
                                .Select(code => code.Code)
                                .FirstOrDefault();

                var title = titles[i];

                var author = authorNames[i];


                epicomPostList.Add(new OutbreakEpicomDTO {
                    PostId = int.Parse(postId),
                    PendingPostId = null,
                    Date = null,
                    ForumId = int.Parse(forumId),
                    TopicId = int.Parse(topicId),
                    Title = title,
                    Author = author
                });
            }

            return epicomPostList;
        }

        public async Task<List<DropdownCode>> GetForumNames() 
        {
            var client = await getClient();

            com.epicomfl.GetAllForumNamesResponseGetAllForumNamesResult forumNames = await client.GetAllForumNamesAsync();

            var someResults = forumNames.Any1.Descendants("ForumName");

            var names = someResults.Select(d => d.Value).ToList();

            someResults = forumNames.Any1.Descendants("Id");

            var ids = someResults.Select(d => d.Value).ToList();

            var results = ids.Zip(names, (key, value) => new DropdownCode { Code = key, Description = value })
                .ToList();

            return results;
        }

        public async Task<List<DropdownCode>> GetTopicsByForumId(int forumId) 
        {
            var client = await getClient();

            com.epicomfl.GetAllTopicsByForumIdResponseGetAllTopicsByForumIdResult forumTopics = await client.GetAllTopicsByForumIdAsync(forumId);

            var someResults = forumTopics.Any1.Descendants("Subject");

            var topics = someResults.Select(d => d.Value).ToList();

            someResults = forumTopics.Any1.Descendants("Id");

            var ids = someResults.Select(d => d.Value).ToList();

            var results = ids.Zip(topics, (key, value) => new DropdownCode { Code = key, Description = value })
                .ToList();

            return results;
        }
        
        public async Task<string> GetEpicomPostsString() {
            var client = await getClient();

            var epicomPostsString = await client.GetEpicomPostsAsync();

            return epicomPostsString;
        }

        public async Task<OutbreakEpicomDTO> GetEpicomPostDetails(int postId) {
            var client = await getClient();

            var detailsString = await client.GetEpicomPostDetailAsync(postId);

            XDocument doc;

            OutbreakEpicomDTO epicomDto = new OutbreakEpicomDTO { };

            epicomDto.PostId = postId;

            try
            {
                doc = XDocument.Parse(detailsString);
            } catch (Exception e) {
                return epicomDto;
            }

            XNamespace ns = doc.Root.GetDefaultNamespace();

            var forumNames = await GetForumNames();

            var forumElements = doc.Descendants(ns + "Forum");

            var forumDescription = forumElements.Select(d => d.Value).FirstOrDefault();

            var forumId = forumNames
                            .Where(code => code.Description.Equals(forumDescription))
                            .Select(code => code.Code)
                            .FirstOrDefault();

            epicomDto.ForumId = int.Parse(forumId);

            var topicElements = doc.Descendants(ns + "Topic");

            var topicDescription = topicElements.Select(d => d.Value).FirstOrDefault();

            epicomDto.TopicDescription = topicDescription;

            string topicId = null;

            if (forumId != null) {
                var topics = await GetTopicsByForumId(Convert.ToInt32(forumId));

                topicId = topics
                            .Where(code => code.Description.Equals(topicDescription))
                            .Select(code => code.Code)
                            .FirstOrDefault();
            }

            epicomDto.TopicId = int.Parse(topicId);

            epicomDto.ForumDescription = forumDescription;

            var postIdElements = doc.Descendants(ns + "Post_ID");

            epicomDto.PostId = int.Parse(postIdElements.Select(d => d.Value).FirstOrDefault());

            var postDateElements = doc.Descendants(ns + "Post_Date");

            epicomDto.Date = DateTime.Parse(postDateElements.Select(d => d.Value).FirstOrDefault());

            var titleElements = doc.Descendants(ns + "Title");

            epicomDto.Title = titleElements.Select(d => d.Value).FirstOrDefault();

            var authorElements = doc.Descendants(ns + "Author_Name");

            epicomDto.Author = authorElements.Select(d => d.Value).FirstOrDefault();

            var detailsElement = doc.Descendants(ns + "Post_Detail");

            epicomDto.Message = detailsElement.Select(d => d.Value).FirstOrDefault();

            return epicomDto;


        }

        private async Task<com.epicomfl.PostsSoapClient> getClient() 
        {
            var epicomPostUrl = await readContext.Codes
                .Where(code => code.CdType.Equals("FDENS") && code.CdValue.Equals("POST WEB SERVICE"))
                .Select(code => code.DsDesc)
                .FirstOrDefaultAsync();

            Uri epicomPostUri = new Uri(epicomPostUrl);

            com.epicomfl.PostsSoapClient client = new com.epicomfl.PostsSoapClient(com.epicomfl.PostsSoapClient.EndpointConfiguration.PostsSoap, epicomPostUrl, (epicomPostUri.Scheme.ToLower() == "https"));
            client.ClientCredentials.Windows.ClientCredential.Domain = config["EPICOM_DOMAIN"];
            client.ClientCredentials.Windows.ClientCredential.UserName = config["EPICOM_UID"];
            client.ClientCredentials.Windows.ClientCredential.Password = config["EPICOM_PWD"];

            return client;
        }

    }
}
