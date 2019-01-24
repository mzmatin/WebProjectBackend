import React from 'react';
import MatchComponentChild from "./MatchComponentChild";
import PaperSheet from "./PaperSheet";
import Paper from "@material-ui/core/Paper/Paper";


class MatchesList extends React.Component {

    render() {
        let matches_list = [];
        for (let i = 0; i < this.props.matches.length; i++){
            console.log(this.props.matches[i]["subtitle"]);
            matches_list.push(
                <PaperSheet key={i} childComponent={<MatchComponentChild
                    type={this.props.matches[i]["type"]}
                    address1={this.props.matches[i]["address1"]} name1={this.props.matches[i]["name1"]}
                    address2={this.props.matches[i]["address2"]} name2={this.props.matches[i]["name2"]}
                    result={this.props.matches[i]["result"]}
                    date={this.props.matches[i]["subtitle"]}
                />} />
            );
        }
        return (
            <Paper style={{height: this.props.height, overflow: 'auto'}}>
                {matches_list}
            </Paper>

        );
    }
}

export default (MatchesList);
