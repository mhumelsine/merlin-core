using Merlin.Core.Data.DataContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Core.EpiUser.Services
{
    public static class MerlinClaim
    {
        public const string
            FullName = "merlin/FullName",
            EpiComUserId = "merlin/epicom-userId",
            Role = "merlin/role",
            County = "merlin/COUNTY";
    }

    public class AuthenticationService
    {
        private readonly IConfiguration config;
        private readonly MerlinReadContext readContext;

        public AuthenticationService(IConfiguration config, MerlinReadContext readContext)
        {
            this.config = config;
            this.readContext = readContext;
        }
        public async Task<ClaimsIdentity> GetIdentityAsync(string userId)
        {
            var issuer = config["Jwt:Issuer"];
            var ns = config["Jwt:ClaimNamespace"];

            var epiUser = await readContext.EpiUser
                .FindAsync(userId);

            var priviledges = await readContext.EpiUserPrivileges
                .Where(p => p.IdUser == epiUser.IdUser)
                .ToListAsync();

            var identity = new GenericIdentity(epiUser.IdUser);

            identity.AddClaim(new Claim(
                type: MerlinClaim.FullName,
                value: $"{epiUser.NmFirstUser} {epiUser.NmLastUser}",
                valueType: ClaimValueTypes.String,
                issuer: issuer));

            identity.AddClaim(new Claim(
                type: ClaimTypes.NameIdentifier,
                value: epiUser.IdUser,
                valueType: ClaimValueTypes.String,
                issuer: issuer));

            identity.AddClaim(new Claim(
                type: MerlinClaim.Role,
                value: epiUser.CdAccess,
                valueType: ClaimValueTypes.String,
                issuer: issuer));

            if (!string.IsNullOrWhiteSpace(epiUser.DsEpicomId))
            {
                identity.AddClaim(new Claim(
                    type: MerlinClaim.EpiComUserId,
                    value: epiUser.DsEpicomId,
                    valueType: ClaimValueTypes.String,
                    issuer: issuer));
            }

            //create claims
            foreach (var privilege in priviledges)
            {
                identity.AddClaim(new Claim(
                    type: $"merlin/{privilege.CdType}",
                    value: privilege.DsPrivilegesType,
                    valueType: ClaimValueTypes.String,
                    issuer: issuer));
            }

            var roles = await readContext.UserRole
                .Where(role => role.IdUser == userId)
                .Select(role => role.IdCodeNavigation.CdValue)
                .ToListAsync();

            //create claims
            foreach (var role in roles)
            {
                //prevent duplicates from being added
                if(!identity.HasClaim(MerlinClaim.Role, role))
                {
                    identity.AddClaim(new Claim(
                        type: MerlinClaim.Role,
                        value: role,
                        valueType: ClaimValueTypes.String,
                        issuer: issuer));
                }
            }

            return identity;
        }
    }
}
