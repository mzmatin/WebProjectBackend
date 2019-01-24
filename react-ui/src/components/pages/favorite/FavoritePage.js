import React from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import Grid from "../../utils/Grid";

const styles = theme => ({
    favoriteContainter:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop:'100px',
        width: '90vw',
        alignItems: 'center',
    }
});

class FavoritePage extends React.Component{
    render() {
        const { classes} = this.props;
        const id = this.getCurrentUser();
        const newsList = this.getRelatedTeamNews(id);
        const playerList = this.getFavPlayers(id);
        const teamList = this.getFavTeams(id);
        return (
            <div className={classes.favoriteContainter}>
                <Grid listItems={newsList} listTitle={"اخبار مورد علاقه"} width={'30vw'} columns={2}/>
                <Grid listItems={playerList} listTitle={"بازیکنان موردعلاقه"} width={'30vw'} columns={2}/>
                <Grid listItems={teamList} listTitle={"تیم‌های مورد علاقه"} width={'30vw'} columns={2}/>
            </div>
        );
    }


    getRelatedTeamNews(id) {
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
        ];
    }

    getCurrentUser() {
        //TODO returns current user id
        return 0;
    }

    getFavPlayers(id) {
        // TODO returns users favorite players
        return [
            {"text": "مسی",
                "address": "https://img.rasset.ie/000f4c11-500.jpg",
                "subtitle" : ""
            },
            {"text": "رونالدو",
                "address": "https://www.irishtimes.com/polopoly_fs/1.3599701.1534524006!/image/image.jpg_gen/derivatives/box_620_330/image.jpg",
                "subtitle" : ""
            },
            {"text": "صلاح",
                "address": "https://givemesport.azureedge.net/images/18/03/25/cb91de1b81c3de65084cb8cb9213bdab/960.jpg",
                "subtitle" : ""
            },
            {"text": "مارسلو",
                "address": "https://cyprus-mail.com/wp-content/uploads/2018/05/marcelo.jpg",
                "subtitle" : ""
            },
            {"text": "مسی",
                "address": "https://img.rasset.ie/000f4c11-500.jpg",
                "subtitle" : ""
            },
            {"text": "رونالدو",
                "address": "https://www.irishtimes.com/polopoly_fs/1.3599701.1534524006!/image/image.jpg_gen/derivatives/box_620_330/image.jpg",
                "subtitle" : ""
            },
            {"text": "صلاح",
                "address": "https://givemesport.azureedge.net/images/18/03/25/cb91de1b81c3de65084cb8cb9213bdab/960.jpg",
                "subtitle" : ""
            },
            {"text": "مارسلو",
                "address": "https://cyprus-mail.com/wp-content/uploads/2018/05/marcelo.jpg",
                "subtitle" : ""
            },
        ];
    }

    getFavTeams(id) {
        // TODO returns user favorite Teams
        return [
            {"text": "چلسی",
                "address": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chelsea_Team_vs_DK_2015.jpg/270px-Chelsea_Team_vs_DK_2015.jpg",
                "subtitle" : ""
            },
            {"text": "بارسلونا",
                "address": "https://cdn.soccerladuma.co.za/cms2/image_manager/uploads/News/295002/7/default.jpg",
                "subtitle" : ""
            },
            {"text": "رئال مادرید",
                "address": "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2016/09/02/14728489999802.jpg",
                "subtitle" : ""
            },
            {"text": "لیورپول",
                "address": "https://talksport.com/wp-content/uploads/sites/5/2018/05/gettyimages-941992300.jpg?strip=all&quality=100&w=700&h=420&crop=1",
                "subtitle" : ""
            },
            {"text": "چلسی",
                "address": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chelsea_Team_vs_DK_2015.jpg/270px-Chelsea_Team_vs_DK_2015.jpg",
                "subtitle" : ""
            },
            {"text": "بارسلونا",
                "address": "https://cdn.soccerladuma.co.za/cms2/image_manager/uploads/News/295002/7/default.jpg",
                "subtitle" : ""
            },
            {"text": "رئال مادرید",
                "address": "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2016/09/02/14728489999802.jpg",
                "subtitle" : ""
            },
            {"text": "لیورپول",
                "address": "https://talksport.com/wp-content/uploads/sites/5/2018/05/gettyimages-941992300.jpg?strip=all&quality=100&w=700&h=420&crop=1",
                "subtitle" : ""
            },
        ];
    }
}

export default withStyles(styles, { withTheme: true })(FavoritePage);