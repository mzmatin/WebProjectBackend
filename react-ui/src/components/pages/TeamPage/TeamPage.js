import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Members from "./Members";
import MatchesList from "../../MatchesList";
import Grid from "../../utils/Grid";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";

const styles = theme => ({
    teamPageContainer:{
        display : 'flex',
        flexDirection: 'column',
        alignItems : 'center',
    },
    matchNewsContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:'100px',
        width: '60vw',
    }
});

class TeamPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            win : true,
            defeat: true,
            draw: true,
            date: true,
        }
    }
    render() {
        const { classes} = this.props;
        const teamCode = this.getTeamCode();
        const newsList = this.getRelatedTeamNews(teamCode);
        return (
            <div className={classes.teamPageContainer}>
                <Members teamCode={teamCode}/>
                <div className={classes.matchNewsContainer}>
                    <div style={{marginLeft:'20px'}}>
                        <Checkbox
                            checked={this.state.win}
                            onChange={() => {
                                if (!(this.state.draw || this.state.defeat || !this.state.win)){
                                    alert("حداقل یکی از سه گزینه‌ی برد، باخت یا تساوی باید انتخاب شود.")
                                    return;
                                }
                                const win = this.state.win;
                                this.setState({
                                    win: !win,
                                });
                            }}
                            value="win_filter"
                        />
                        برد
                        <Checkbox
                            checked={this.state.defeat}
                            onChange={() => {
                                if (!(this.state.draw || !this.state.defeat || this.state.win)){
                                    alert("حداقل یکی از سه گزینه‌ی برد، باخت یا تساوی باید انتخاب شود.")
                                    return;
                                }
                                const defeat = this.state.defeat;
                                this.setState({
                                    defeat: !defeat,
                                });
                            }}
                            value="defeat_filter"
                        />
                        باخت
                        <Checkbox
                            checked={this.state.draw}
                            onChange={() => {
                                if (!(!this.state.draw || this.state.defeat || this.state.win)){
                                    alert("حداقل یکی از سه گزینه‌ی برد، باخت یا تساوی باید انتخاب شود.")
                                    return;
                                }
                                const draw = this.state.draw;
                                this.setState({
                                    draw: !draw,
                                });
                            }}
                            value="draw_filter"
                        />
                        مساوی
                        <Checkbox
                            checked={this.state.date}
                            onChange={() => {
                                const date = this.state.date;
                                this.setState({
                                    date: !date,
                                });
                            }}
                            value="date_filter"
                        />
                        تاریخ
                        <MatchesList matches={this.getTeamMatchesList(teamCode)} height={'60vh'}/>
                    </div>
                    <Grid listItems={newsList} listTitle={"اخبار مرتبط"} width={'auto'} columns={2}/>
                </div>
            </div>
        );
    }

    getTeamCode() {
        // TODO get the desired teamCode {it will handle later by routing in site}
        return 1;
    }

    getTeamMatchesList(teamCode) {
        // TODO get team matches from the server
        let result = [];
        if (this.state.win){
            result.push({
                "type": "فوتبال",
                "address1": 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "name1": "بارسلونا",
                "address2": 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png', 'name2': 'چلسی',
                "result": "۲-۴", "subtitle": "۱ فروردین: ۲۱:۰۰ "
            }, {
                "type": "فوتبال",
                "address1": 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "name1": "بارسلونا",
                "address2": 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png', 'name2': 'چلسی',
                "result": "۲-۴", "subtitle": "۱ اردیبهشت: ۲۱:۰۰ "
            });
        }
        if (this.state.draw){
            result.push({
                "type": "فوتبال",
                "address1": 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "name1": "بارسلونا",
                "address2": 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png', 'name2': 'چلسی',
                "result": "۲-۲", "subtitle": "۱ خرداد : ۲۱:۰۰ "
            },{
                    "type": "فوتبال",
                    "address1": 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "name1": "بارسلونا",
                    "address2": 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png', 'name2': 'چلسی',
                    "result": "۳-۳", "subtitle": "۱ تیر: ۲۱:۰۰ "
                });
        }
        if (this.state.defeat){
            result.push({
                    "type": "فوتبال",
                    "address1": 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "name1": "بارسلونا",
                    "address2": 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png', 'name2': 'چلسی',
                    "result": "۴-۲", "subtitle": "۱ مرداد: ۲۱:۰۰ "
                },
                {
                    "type": "فوتبال",
                    "address1": 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "name1": "بارسلونا",
                    "address2": 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png', 'name2': 'چلسی',
                    "result": "۳-۱", "subtitle": "۱ شهریور: ۲۱:۰۰ "
                });
        }
        return result;
    }

    getRelatedTeamNews(teamCode) {
        // TODO get related news to the team from the server
        return [
            {"text": "پله: مارادونا همه چیز داشت، مسی نه ",
                "address": "https://static.farakav.com/files/pictures/thumb/01360957.jpg",
                "subtitle" : "۱۳۹۷/۰۹/۱۵"
            },
            {"text": "والورده: مصدومیت مسی جدی نیست",
                "address": "https://static.farakav.com/files/pictures/thumb/01354229.jpg",
                "subtitle" : "۱۳۹۷/۰۹/۱۱"
            },
            {"text": "مسی چند کلاس بالاتر از مودریچ است ",
                "address": "https://static.farakav.com/files/pictures/thumb/01360776.jpg",
                "subtitle" : "۱۳۹۷/۰۹/۱۴"
            },
            {"text": "پله: مارادونا همه چیز داشت، مسی نه ",
                "address": "https://static.farakav.com/files/pictures/thumb/01360957.jpg",
                "subtitle" : "۱۳۹۷/۰۹/۱۵"
            },
            {"text": "والورده: مصدومیت مسی جدی نیست",
                "address": "https://static.farakav.com/files/pictures/thumb/01354229.jpg",
                "subtitle" : "۱۳۹۷/۰۹/۱۱"
            },
            {"text": "مسی چند کلاس بالاتر از مودریچ است ",
                "address": "https://static.farakav.com/files/pictures/thumb/01360776.jpg",
                "subtitle" : "۱۳۹۷/۰۹/۱۴"
            },
        ];
    }
}

export default withStyles(styles, { withTheme: true })(TeamPage);