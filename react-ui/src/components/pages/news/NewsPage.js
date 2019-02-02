import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Chip from '@material-ui/core/Chip';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PaperSheet from "../../PaperSheet";
import PersianNumber from '../../utils/PersianNumber';
import TextField from "@material-ui/core/TextField/TextField";
import ImageAvatars from "../../utils/ImageAvatars";
import Comment from "./Comment";
import Grid from "../../utils/Grid";
import NewsMain from "./NewsMain";
import RTL from "../../utils/RTL";
import 'whatwg-fetch'


const getSampleCommentReply = () => {
    return {
        "userName": "آبی تر از آبی",
        "userAvatarUrl": "data:image/jpeg;base64,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",
        "text": "جالبه که توی این قضیه قانونی هم باز پرسپولیسیا دارن توی روز روشن قانون شکنی میکنن.حضور آقای گرشاسبی سر کار از امروز به بعد جرم محسوب میشه وایشون خیلی راحت اومدن سرکار ",
        "time": {
            "day": "16",
            "month": "آذر",
            "year": "1397",
            "second": "49",
            "minute": "02",
            "hour": "00",
        },
        "likeCount": 25,
        "dislikeCount": 40
    }
};

const getSampleComment = () => {
    return {
        'commentBody': {
            'userName': 'ابی',
            "userAvatarUrl": "https://pickaface.net/gallery/avatar/pk_karthik556366573d429.png",
            "text": "باید بره کنار تا زمانی که جیره خور دولت هستش هرموقع از لحاظ درآمدی خودکفا شد اون موقع میگن مستقل. در مورد مدیر عامل های پرسپولیس و استقلال نیز این قانون صدق میکنه باید توجه به اینکه منبع درآمد هردو باشگاه وزارت ورزش هستش ",
            "time": {
                "day": "15",
                "month": "آذر",
                "year": "1397",
                "second": "03",
                "minute": "00",
                "hour": "18",
            },
            "likeCount": 25,
            "dislikeCount": 40
        },
        'commentReplies': [
            getSampleCommentReply(),
            getSampleCommentReply(),
            getSampleCommentReply(),
            getSampleCommentReply(),
            getSampleCommentReply(),
            getSampleCommentReply(),
            getSampleCommentReply()
        ]
    }
};

const getSampleNews2 = () => {
    return {
        'resources': [
            "فارس نیوز",
            "ورزش ۳",
            "نود",
            "عرب نیوز",
        ],
        'tags': [
            "فارس نیوز",
            "ورزش ۳",
            "نود",
            "عرب نیوز",
        ],
        'imageUrl': 'https://varzeshema.com/files/2018/05/188027_224-1.jpg',
        'title': 'شوک به فوتبال ایران/ تاج به دفتر کارش نرفت!',
        'summary': 'برخی منابع موثق از حضور نیافتن رییس فدراسیون فوتبال در محل کار خود خبر می‌دهند.',
        'viewsCount': '133',
        "time": {
            "day": "15",
            "month": "آذر",
            "year": "1397",
            "second": "03",
            "minute": "00",
            "hour": "18",
        },
        'content': 'به گزارش وبسایت نود، ادامه سکوت وزارت ورزش درباره تعیین تکلیف فدراسیون فوتبال و پاسخ ندادن به نامه‌های مکرر فدراسیون باعث بروز مشکلات در این فدراسیون برای آماده‌سازی تیم‌های ملی به ویژه تیم‌ملی بزرگسالان شده است\n' +
            '\n' +
            'در تازه‌ترین تحولات، مرد اول ساختمان سئول امروز بعد از پایان مهلت قانونی به محل کار خود مراجعه نکرد تا فوتبال ایران با یک شوک احتمالی مواجه شود.\n' +
            '\n' +
            'اتفاقی که صرف نظر از واکنش‌های بین‌المللی مشخص نیست وضعیت فوتبال ما را در آستانه جام ملت‌ها با چه روندی روبرو خواهد ساخت‌.\n' +
            '\n' +
            'پیش از این حمیدرضا گرشاسبی که او هم مشمول قانون منع به کارگیری بازنشستگان محسوب می شد، در محل کارش در باشگاه پرسپولیس حاضر شده بود.',
        'likeCount': 25,
        'disLikeCount': 136,
        'comments': [
            getSampleComment(),
            getSampleComment(),
            getSampleComment(),
            getSampleComment(),
            getSampleComment(),
            getSampleComment(),
        ]
    }
};


const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    main: {
        marginRight: theme.spacing.unit * 2,
        marginLeft: '100px',
    },
});

class NewsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: null,
            newsComments: null,
            relatedNews: null,
        };
        this.id = props.match.params.id;
    }

    componentDidMount() {
        let thisComp = this;
        let endpoint = '/api/news/' + this.id.toString() + '/';
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch(endpoint, lookupOptions)
            .then((response) => {
                return response.json()
            }).then((responseData) => {
            console.log(responseData);
            this.setState({
                newsComments: responseData.comments,
                news: {
                    'title': responseData.title,
                    'time': responseData.time,
                    'summary': responseData.summary,
                    'content': responseData.content,
                    'disLikeCount': responseData.disLikeCount,
                    'imageUrl': responseData.imageUrl,
                    'likeCount': responseData.likeCount,
                    'resources': responseData.resources,
                    'tags': responseData.tags,
                    'viewsCount': responseData.viewsCount,

                }
            });
            console.log(this.state.news, "dfk")
            console.log(this.state.newsComments, "dfk")
        }).catch(function (error) {
            console.log('error', error)
        });
        endpoint = '/api/related-news/?news=' + this.id.toString();
        lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch(endpoint, lookupOptions)
            .then((response) => {
                return response.json()
            }).then((responseData) => {
            console.log(responseData);
            this.setState({
                relatedNews: responseData,
            });
        }).catch(function (error) {
            console.log('error', error)
        });
    }


    getNews2 = () => {
        return [
            {
                "text": "پله: مارادونا همه چیز داشت، مسی نه ",
                "address": "https://static.farakav.com/files/pictures/thumb/01360957.jpg",
                "subtitle": "۱۳۹۷/۰۹/۱۵"
            },
            {
                "text": "والورده: مصدومیت مسی جدی نیست",
                "address": "https://static.farakav.com/files/pictures/thumb/01354229.jpg",
                "subtitle": "۱۳۹۷/۰۹/۱۱"
            },
            {
                "text": "مسی چند کلاس بالاتر از مودریچ است ",
                "address": "https://static.farakav.com/files/pictures/thumb/01360776.jpg",
                "subtitle": "۱۳۹۷/۰۹/۱۴"
            },
            {
                "text": "پله: مارادونا همه چیز داشت، مسی نه ",
                "address": "https://static.farakav.com/files/pictures/thumb/01360957.jpg",
                "subtitle": "۱۳۹۷/۰۹/۱۵"
            },
            {
                "text": "والورده: مصدومیت مسی جدی نیست",
                "address": "https://static.farakav.com/files/pictures/thumb/01354229.jpg",
                "subtitle": "۱۳۹۷/۰۹/۱۱"
            },
            {
                "text": "مسی چند کلاس بالاتر از مودریچ است ",
                "address": "https://static.farakav.com/files/pictures/thumb/01360776.jpg",
                "subtitle": "۱۳۹۷/۰۹/۱۴"
            },
        ];
    };

    render() {
        const {classes} = this.props;
        const newsList = this.getNews2();
        if (this.state.news !== null && this.state.relatedNews !== null) {
            return (
                <div className={classes.root}>
                    <NewsMain newsComments={this.state.newsComments} news={this.state.news} id={this.id}
                              userAvatar={'https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png'}/>
                    <RTL>
                        <Grid listItems={this.state.relatedNews} listTitle={"اخبار مرتبط"} width={'auto'} columns={2}/>
                    </RTL>
                </div>
            );
        } else {
            return <div>Loading ...</div>
        }

    }
}

NewsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewsPage);
