import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "../../utils/Grid";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Input from "@material-ui/core/Input/Input";
import SearchIcon from '@material-ui/icons/Search';


const styles = ({
    leagueMainPageContainer : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent: 'space-evenly',
        marginTop: '100px',
        height : '85vh',
        // width : '100vw',
    },
    leagueTables: {
        display: 'flex',
        flexDirection : 'row',
        justifyContent: 'space-evenly',
    }
});


class LeagueMainPage extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            currentLeagueInformation : [],
            oldLeagueInformation: [],
        }
    }
    componentWillMount() {
        const currentLeaguesInformation = this.getCurrentLeaguesInformation();
        const oldLeaguesInformation = this.getOldLeaguesInformation();
        this.setState(
            {currentLeaguesInformation : currentLeaguesInformation,
                oldLeaguesInformation : oldLeaguesInformation, change:true});
    }


    render() {
        const {classes} = this.props;
        let current = this.state.currentLeaguesInformation;
        let old = this.state.oldLeaguesInformation;
        console.log(current, old);
        console.log(this.state.currentLeaguesInformation,this.state.oldLeaguesInformation);
        return (
          <div className={classes.leagueMainPageContainer}>
                <div style={{width:'30vw'}}>
                    <Input
                          id="input-with-icon-adornment"
                          startAdornment={
                              <InputAdornment position="start">
                                  <SearchIcon />
                              </InputAdornment>
                          }
                          placeholder={"نام لیگ:سال"}
                          onKeyDown={this.handleLeaguePage}
                      />
                </div>
              <div className={classes.leagueTables}>
                  <div>
                      <Grid listItems={current} listTitle={"فصل جاری"} width={700} columns={2}/>
                  </div>
                  <div>
                      <Grid listItems={old} listTitle={"فصل‌های قدیمی"} width={700} columns={2}/>
                  </div>
              </div>
          </div>
        );
    }

    handleLeaguePage = (event) => {
        if (event.key === 'Enter'){
            let input = event.target.value;
            if (input === ""){
                const current = this.getCurrentLeaguesInformation();
                const old = this.getOldLeaguesInformation();
                this.setState({currentLeaguesInformation: current,
                    oldLeaguesInformation:old});
                return;
            }
            let strs = input.split(":");
            this.currentFilter(strs[0], strs[1]);
            this.oldFilter(strs[0], strs[1]);
        }
    };

    currentFilter(name, date){
        const current = this.state.currentLeaguesInformation;
        let currentLeagueInformation = [];
        for (let j =0; j < current.length; j++){
            if (current[j]["text"] === name && current[j]["subtitle"] === date){
                currentLeagueInformation.push(current[j])
            }
        }
        this.setState({currentLeaguesInformation:currentLeagueInformation});
    }

    oldFilter(name, date){
        const old = this.state.oldLeaguesInformation;
        let oldLeagueInformation = [];
        for (let j =0; j < old.length; j++){
            if (old[j]["text"] === name && old[j]["subtitle"] === date){
                oldLeagueInformation.push(old[j])
            }
        }
        this.setState({oldLeaguesInformation:oldLeagueInformation});
    }

    getCurrentLeaguesInformation() {
        return [
            {"text": "لیگ برتر انگلیس",
                "address": "https://img5.s3wfg.com/web/img/images_uploaded/b/4/barclayspremierleague.jpg",
                "subtitle" : "۱۳۹۷-۱۳۹۸"
            },
            {"text": "لالیگای اسپانیا",
                "address": "https://files.laliga.es/seccion_logos/laliga-santander-v-negativo-16-9.jpg",
                "subtitle" : "۱۳۹۷-۱۳۹۸"
            },
            {"text": "ان بی ای",
                "address": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAABKVBMVEUCU6T////MKzEDU6YASKIASKSZsNCiuM7MFR/ir7CdsccAS6P///0AT6QBVKMAT6hIc7L2+fiLpchsjr36//////rf6u3//f3LLDEAQ5wAUKQARKIASZ4ASab9/P8AUKgAVaDw9PfSGidbhLrkwMEASZjBAADOJyz///XD1uEAPZzGAA7QKTS9y9sAR6jGABfx5uIlX6k1aK3T4OkvaLbHNzvp9/Z3mMLQXWEgXKK0xt1We6mVttF/ncDj6OsANKDRfYHKPUhDeK9egLq/ERfbj4v34OHQeYHMZm7KU1L58u7QSlXZi47u09KVr9ODn8O/WFrfpq0AQakza6EnYJxljrlki8DN2enQ4+PcoJ2xwM4AKZS+GR/OcnLGTEjDLTXgtrDmycuEmsaB2kKTAAANGElEQVR4nO2dDVfaSBfHZxiEWCaD0BlCQgyg0AiIUFlBfGnVKmuptLtWt2sfXXW//4d4ZhJQXgPnbLsuQ/6nPSWBnpP8cu+dOy+5A4AvX758+fLly5cvX758+fLly5cvX758/TdFCP8zTeJnmZe+0p8ihAAiQI1OlZpOo3T0pS/3pwipQT3ydmUWNU3TQC99vT9YCKFMWl8JJyicTdlCo5lC3GzkEUJqar/G8IwEIMRce80tmWwBRcAexhrDs1KwGMOMxXV5LAGpVwkIKb8rlk2M0Tts4XanVX1SjFJLoxgW8lFZIBigrmmQsVrjbTB1qQ/qsniY2LDoRm7nTYVLKZVKFfvjTRVbGtyoLcnhDiRt1vGGxRL7+qpIDowBpTM1LHzEovhcSQZcJW0lcBGjzIJ/6pygBCqWIaOsnE+P+Q6Z5W6Q4O5wt9aDYG9uKsctyP3hQJfBEiJ/bGgYllM8RRrz7TbTmNsUcFPYtZ8Y8L92i2qYrfzrF/zDhYCe4I8zkR+f+EUaz42BBnNKoE/2fQxbtMbhzXlgRNE/eDSEKxPcOhjuaxFpp9LPIKnc8UYS7o/zoXkSAmaBWaxcJOMcgRjBvb7EaMgOApuVjsVzpZQxz3bAc2Rg1hnE+5GxX2fUYp8dYHozyCBg3/Gz9eBcR0XOQF3hKXJdH+8JKFPO4j4GTzGxp1uLn97OzHnz6AS9wvgGDhknA9lza8gMAoFKi5++jsy1IXAGn/ldhINjnyRCK7gfwtkogxw/HQ/+2xf9Y4WcwP8qMsGaM7QPAa1WkkMMlGV+/mDeGay6DCZYsxl/7lBrNDeeQUhuBgj0GYL113BIlITBkgcDBNQT2GPA6HIpIKcdeDEAKHL9xAAuK4Hk4jFAKBjqtgsYtm/tYQKSMyAkY0SBqScshwHW6N3a/QgCmRkgQ129NJonhzXm+gKFD5XkSESUlAEiHICeOWmEvjstArbcYHCh3I8ERIkZpPYLlOGhIebjih3YXBAGABRDG5roHw1Mt9D2TXJtUewApMI8AogplOGphvYdjwfDIUFKBquHk+ZZLLqjLECORAzUxJNm3DSrfVGR3w4QKBbGA+hGhcf7tcHIKB8Dou5jj5lnrMH2riI3A0SKCQg9pl0xptpvdnJTYgYg2GBTFiBgat33dxukY4D0xNTJdws+VmT2hb7BAi99suVlYOh70JoBQq4iMYN8Fs9gCLRdsp9yJdkYRK5ncATRbvwlLwO9NhsDeqTIyQAg9cQrP+rzBfj7cw9SKgYIpQpMm80XlhU5GaSNr1PCoUUhdRnkJGVAtvY8CfA0GbapMBRNWgZqc8ywyYDaF/dt0XQOrMiRiYG5FPYkQOHDvVKpugcPyr2MDLYiWeZlBPSixG/4oRsPKpsyMtAbWPOyA2eSSbkQURHD6ql88QDjV++/ebkC5ubPb9jedVsGmJSRQcj0DIgYfnT7im33+HlZkjQM+F1ce44fwao70easPuLB4UxKBmUPACIirokb3jxddo+XFRkZeA4nQ3zvPPhN5cg9fl6uKhODvz08weolhsnATvfMrYQMXplwcn/JeoqByVMnS6LwfK3be5aJwfuEmyqPax1oq9RtC5OVnGgcMe30MgSZGGxd1xLZRGwsA9je7Q0Y2L+KDIF3ne7W5GOwmk7p5vvw2HzZovSu5wxuhmDh6u2mdAwigICoXpgQGWmr0vP/nHNCg0eKfAwQQPkCnhAYMY+Kbn5sf8IDVKRiAIBenthzFF1F1xCSlcfuuY/OYkWpGCCj6dVjaFfcWcakvesMJmF4YUvnC0Rd9xxE6aYIyWSpI9ar4W6+LBODIIrEPUfSfle6DYN9LnpXmLq5o0wMVlHQe0y1Veqlx86IGoYd+RiQKbNMtLfqINntOLWdySaZGESQ+c4TQS9NSirKbUyc0T5VePYoFwOQ9WKg0QfnuduV3Ud3MImy6p2yKRUDQKZMNlZPA5sBezNHuyNOPJ+KfVSkYoBUTzvg97xjJ+371sA7XtpZSSoGYkmaBwELHtn2bQdafem0hdtvZGIAlsJT5lxvFOViZOD15neJGCB12iqUOyXZtoaDxsajRAyAaBw9LWG5dASt4ZPOCVkYILAU8l6H0nrzMOEbeRgAVPdCgPFtdQIjiRgsvfJiAOluVX47AGrWc0HSWUt+Bmjp0NMQHh7lZ0BQsO41+dy6oCNrFJxxF6kYRBoeY0m4/XF0zJUJKhIxEDVysl7rEHYe6QAEC2vtnFx2wC1h6cCLwflObKB1xBY9u5GMAUHq18m5okaP3pwPOgLMSdVncu0AmAflP+mkFpL3mu4o7ZZPg5ZFc7dyjR84BySztFScsFLRWZilHHd67kDxRUW2sTTnyED8w/icGcNHJRCwS7s5ZzCtdXOvJOUaS+urf2DGxy7IwLTlrM20ldOdT8fJinRzLP0MVDMxzhkwbJ+Kd77FGLttS7gOpZ8BUtcnFNg9tp2ppkDSkcwMAND3xreQZ2uBIcnLwADZsXlCdS0w9Pa/vAyAuQ9jI+NmXOfDFRDkZUBQam/sCrXO6VABBHkZAITy49oGDZ6fbi4KAwAiK2NW5mh0uIqk1AzIanycHdBflcVhAECxwEaXbOLW6SIxGL8iYaisrOQMQPqKjjYONDdQG0d2BsgcjYvDJQRlZ0BAamStGrbox0WyAy4OYcQdzpQFsgMuosdH3CEndU2YMYrqB8O9p+qiMQCZYpjFBiKCditxXZyxIkj/PGQIu4vGgEuPQ+05KuCBkZRFYQD0BusfTHhQFo4BQcbWSezZH1hH4hpRHgo2E5h1S+xSq7SIDBCILpVhd2Eehse2lDUgpjAg6Uzx0GLYrYfyq6Q1YabvJhJslp35Jwt2KraUdbKmM0DpVMNdsU4vngqKLhgD/ttUws0T2I7sc22Tf7va27jsqUKSZAxIt7yw2NwYiVl4cUTcvWpUQ4y3E4M4eQKz8I4tJwODqKoKjGhGJRFCAD+IqCAjFiRwLIahqmnUjDGndXzqM0jFgD9r8nZ9fX07TX5Z/7AOttcdbetis9Loyof19Q8nqpiQdoIiPpbRF/jH6Gv+qaZH4jwXVHuzC9n9iErcd1zqOgDOZo7Uap0GJHz3X9QSFQxgJhjHOMYZYGxhRjG7UoHpvMhFCVk6EL0njS5XJG0XHAb4MNVjwBLXexjjuKGeiLd7GT4BhuqMp4hqohLbAS68j2MoGGi49p4bADuIbH2BWvYdhIc8WF5zKgw+jS1LycCi+jODYiSLYSii70H87RuE34OIpGo8JGpJWfNEzgBjDV5/YdCNB7X3eUrhtarXMN4r83hZJGlyzUMiS8qaJwoG/M7Lh64dYPjuuoxxIm8AyqMC/1k9mBGl+Zn2VBpERgaQvoOxBtRcX2AM40JeVU+gxf4IcRO5Eju4hXDfnqbyMcAW/LJBC9RtF8Tu55iVTbXBk6JfGvzzB/4fImIFZ6ckYY2oLgMIryBPCVwGMLESZxaLX35nFBb3oYVDJgJ6gXcX2rcy5souAw2a78QEo8ugVrzkAaH2vxqmNPQda7isc194LWbkZayT9cQg7bzg12sbxUandTMGnRqiGk6YYtua75xB7lRaBhiSqycG0GGAE19F6iTmn3GM/wdyWeAm0i0RIwmDLad+ougzOXbQ1Os9X+D5QZFnRDWRNoSazdoGhCsGIcUa/0HL3dk16TD4bL70XfxDrYb4XYSfGLy9DHftANPYN54cwS9hHgkaplNGq8HvVs8KuzjuMhDvQH+e8/2dyerfsLvHtZMrN8kK9wLXF0SCwB1C7OG4boj6uzAcJCDv9KkvFJdBh59tzDkDJOpj4XpRjJS8jtXpVdSsZ+tZchjLCr0LZ0iinqXbZCseq8f2ggA1nZ6juzuPfWpxBifGnDMgRLR1X1X+meRX8yoiwXwwgqJ5M5/PG5FgOq0GzYyaSat5/q8BjHUxlETbTkh0imbVVUBe+jb+kQgxv2FtYy/l7OAJEEKAxz0ivhAjie4QK0Fp4mzwKV4D/eLWChM7FCVLOUpZITXnDHhAeA03LLxN0ITtzocUCbmLc3Z511H5jWoWXl/9yZf404VAPqthrVYEszl1cK/HYNO+rVKN1XQ03+FAaPVQvL5ULs5m0ME9Mbyu0R07UHmkGsb70Tn3BEeXNZEG8g7iLM8zEnLmHDsVJdmBlOKwjiRgwGN9HTPIEq+DS6phiLjoIfUtFVnzp8pdm2LN+lOXgAAQOcIvdUukRIlX+02CMh7ibcTSfha2j86qlFqY1fKzRdL/uvjDjV4loCYo8Cc8VdkY70K6lZEK+ehLX/0PE1LzYYyp2NN56g6OjjTMeEZ9mJr/FqFPaOsr7xRN2tN3RHiD1Q+MYOalL/uHChE11TwsJ2basg1ma+EPZpAQeTyhJ6SaugnEDPwUGaYZmTGlmjsh3oNKR6c0jggZaSOdkRQBcPpIs7T3aN57Sb58+fLly5cvX758+fLly5cvX758+ZJU/wey1Xzzyw+q/AAAAABJRU5ErkJggg==",
                "subtitle" : "۱۳۹۷-۱۳۹۸"
            },
            {"text": "لیگ برتر انگلیس",
                "address": "https://img5.s3wfg.com/web/img/images_uploaded/b/4/barclayspremierleague.jpg",
                "subtitle" : "۱۳۹۷-۱۳۹۸"
            },
            {"text": "لالیگای اسپانیا",
                "address": "https://files.laliga.es/seccion_logos/laliga-santander-v-negativo-16-9.jpg",
                "subtitle" : "۱۳۹۷-۱۳۹۸"
            },
            {"text": "ان بی ای",
                "address": "data:image/png;base64,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",
                "subtitle" : "۱۳۹۷-۱۳۹۸"
            },
        ];
    }

    getOldLeaguesInformation() {
        return [
            {"text": "لیگ برتر انگلیس",
                "address": "https://img5.s3wfg.com/web/img/images_uploaded/b/4/barclayspremierleague.jpg",
                "subtitle" : "۱۳۹۴-۱۳۹۵"
            },
            {"text": "لالیگای اسپانیا",
                "address": "https://files.laliga.es/seccion_logos/laliga-santander-v-negativo-16-9.jpg",
                "subtitle" : "۱۳۹۵-۱۳۹۶"
            },
            {"text": "ان بی ای",
                "address": "data:image/png;base64,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",
                "subtitle" : "۱۳۹۶-۱۳۹۷"
            },
            {"text": "لیگ برتر انگلیس",
                "address": "https://img5.s3wfg.com/web/img/images_uploaded/b/4/barclayspremierleague.jpg",
                "subtitle" : "۱۳۹۴-۱۳۹۵"
            },
            {"text": "لالیگای اسپانیا",
                "address": "https://files.laliga.es/seccion_logos/laliga-santander-v-negativo-16-9.jpg",
                "subtitle" : "۱۳۹۵-۱۳۹۶"
            },
            {"text": "ان بی ای",
                "address": "data:image/png;base64,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",
                "subtitle" : "۱۳۹۶-۱۳۹۷"
            },
        ];
    }
}

LeagueMainPage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(LeagueMainPage);
