import * as React from 'react';

interface QuestionLabelProps {
    text: string;
    questionNumber: string | undefined;
}

export default class QuestionLabel extends React.Component<QuestionLabelProps> {
    public render() {
        const { text, questionNumber } = this.props;
        const style = {
            //purposely using == here to get null, undefined, and empty string, questions start at 1, so no 0 to worry about
            paddingLeft: questionNumber == null ? "0px" : "25px" 
        };

        return <div style={{ position: 'relative' }}>
            {questionNumber &&
                <div className="badge-primary text-center" style={{ position: 'absolute', top: '0px', left: '0px', minWidth: '21px', minHeight: '21px', borderRadius: '50%' }}>
                    {questionNumber}
                </div>
            }
            <div style={style}>
                {text}
            </div>
        </div>;
    }
}