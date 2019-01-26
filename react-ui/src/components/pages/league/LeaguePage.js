import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import Ranking from "./Ranking";
import MatchesList from "../../MatchesList";
import Knockout from "./Knockout";

const styles = theme => ({
    leagueMainPageContainer : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent: 'space-between',
        marginTop: '80px',
        height : '85vh',
        width : '100vw',
    },
    leagueTables: {
        display: 'flex',
        flexDirection : 'row',
        justifyContent: 'space-evenly',
        alignItems:'baseline',
        flexShrink: '0',
    },
    comeCenter : {
        alignSelf: 'center',
        flexGrow: '1',
        marginTop: '100px'
    },
});

class LeaguePage extends React.Component{

    render() {
        const {classes} = this.props;
        return (
          <div className={classes.leagueMainPageContainer}>
              <div className={classes.comeCenter}>
                  <Paper>
                      <div variant="h2" gutterBottom >
                          {this.props.name + " " + this.props.season}
                      </div>
                  </Paper>
              </div>
              <div className={classes.leagueTables}>
                  <div>
                      <Ranking ranks={this.getLeagueRanking(this.props.name, this.props.season)}/>
                  </div>
                  <div style={{width:'40vw'}}>
                      <MatchesList matches={this.getSeasonMatches(this.props.name, this.props.season)} height={'60vh'}/>
                  </div>
              </div>
              <div className={classes.comeCenter}>
                  <Knockout teams={this.getTeams(this.props.name, this.props.season)} name={"جدول حذفی"}/>
              </div>
          </div>
        );
    }

    getLeagueRanking(name, seson) {
        // TODO get desred league ranking from server
        return [
            {'name' : 'چلسی', 'avatar' : 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
            'numOfMatches': 20, 'goalDiff' : 12, 'pts': 46},
            {'name' : 'چلسی', 'avatar' : 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff' : 12, 'pts': 46},
            {'name' : 'چلسی', 'avatar' : 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff' : 12, 'pts': 46},
            {'name' : 'چلسی', 'avatar' : 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff' : 12, 'pts': 46},
            {'name' : 'چلسی', 'avatar' : 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff' : 12, 'pts': 46},
            {'name' : 'چلسی', 'avatar' : 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff' : 12, 'pts': 46},
            {'name' : 'چلسی', 'avatar' : 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff' : 12, 'pts': 10},
            {'name' : 'چلسی', 'avatar' : 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff' : 12, 'pts': 46},
            {'name' : 'چلسی', 'avatar' : 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff' : 12, 'pts': 46},
            {'name' : 'چلسی', 'avatar' : 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff' : 12, 'pts': 46},
            {'name' : 'بارسلونا', 'avatar' : 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                'numOfMatches': 20, 'goalDiff' : 12, 'pts': 46},
        ];
    }

    getSeasonMatches(name, season) {
        // TODO get desired season matches from server
        return [
            {
                "type": "فوتبال",
                "address1": 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "name1": "بارسلونا",
                "address2": 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png', 'name2': 'چلسی',
                "result": "۲-۲", "subtitle": "۲۳آذر : ۲۱:۰۰ "
            },
            {
                "type": "فوتبال",
                "address1": 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "name1": "بارسلونا",
                "address2": 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png', 'name2': 'چلسی',
                "result": "۲-۴", "subtitle": "۴ دی: ۲۱:۰۰ "
            },
            {
                "type": "فوتبال",
                "address1": 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "name1": "بارسلونا",
                "address2": 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png', 'name2': 'چلسی',
                "result": "۲-۴", "subtitle": "۲ بهمن: ۲۱:۰۰ "
            },
            {
                "type": "فوتبال",
                "address1": 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "name1": "بارسلونا",
                "address2": 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png', 'name2': 'چلسی',
                "result": "۲-۴", "subtitle": "۳ مهر: ۲۱:۰۰ "
            },
            {
                "type": "فوتبال",
                "address1": 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "name1": "بارسلونا",
                "address2": 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png', 'name2': 'چلسی',
                "result": "۲-۴", "subtitle": "۴دی: ۲۱:۰۰ "
            },
            {
                "type": "فوتبال",
                "address1": 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "name1": "بارسلونا",
                "address2": 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png', 'name2': 'چلسی',
                "result": "۲-۴", "subtitle": "۷ اسفند: ۲۱:۰۰ "
            },
        ]
    }


    getTeams(name, season) {
        // TODO get information of knockout games of desired league from server
        return[
            [
                {'name1':'barcelona', 'name2':'chelsea', 'score1':4, 'score2':2, 'avatar1':'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', 'avatar2':'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'},
                {'name1':'barcelona', 'name2':'chelsea', 'score1':4, 'score2':2, 'avatar1':'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', 'avatar2':'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'},
                {'name1':'barcelona', 'name2':'chelsea', 'score1':4, 'score2':2, 'avatar1':'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', 'avatar2':'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'},
                {'name1':'barcelona', 'name2':'chelsea', 'score1':4, 'score2':2, 'avatar1':'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', 'avatar2':'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'},
                {'name1':'barcelona', 'name2':'chelsea', 'score1':4, 'score2':2, 'avatar1':'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', 'avatar2':'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'},
                {'name1':'barcelona', 'name2':'chelsea', 'score1':4, 'score2':2, 'avatar1':'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', 'avatar2':'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'},
                {'name1':'barcelona', 'name2':'chelsea', 'score1':4, 'score2':2, 'avatar1':'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', 'avatar2':'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'},
                {'name1':'barcelona', 'name2':'chelsea', 'score1':4, 'score2':2, 'avatar1':'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', 'avatar2':'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'},
            ],
            [
                {'name1':'barcelona', 'name2':'chelsea', 'score1':4, 'score2':2, 'avatar1':'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', 'avatar2':'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'},
                {'name1':'barcelona', 'name2':'chelsea', 'score1':4, 'score2':2, 'avatar1':'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', 'avatar2':'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'},
                {'name1':'barcelona', 'name2':'chelsea', 'score1':4, 'score2':2, 'avatar1':'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', 'avatar2':'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'},
                {'name1':'barcelona', 'name2':'chelsea', 'score1':4, 'score2':2, 'avatar1':'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', 'avatar2':'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'},
            ],
            [
                {'name1':'barcelona', 'name2':'chelsea', 'score1':4, 'score2':2, 'avatar1':'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', 'avatar2':'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'},
                {'name1':'barcelona', 'name2':'chelsea', 'score1':4, 'score2':2, 'avatar1':'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', 'avatar2':'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'},
            ],
            [
                {'name1':'barcelona', 'name2':'chelsea', 'score1':4, 'score2':2, 'avatar1':'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', 'avatar2':'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'},
            ]
        ];
    }
}

export default withStyles(styles, { withTheme: true })(LeaguePage);