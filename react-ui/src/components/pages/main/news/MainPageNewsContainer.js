import React from 'react';
import ControlledExpansionPanels from "./ControlledExpansionPanels";


class MainPageNewsContainer extends React.Component{


    render() {
        const news = this.getData(this.props.title, this.props.fav);
        return (
                <ControlledExpansionPanels news={news}/>
        );
    }

    getData(title, fav) {
        // TODO get news from the server
        if (title === "soccer"){
            if (fav){
                return [
                    {"title": "موردعلاقه-فوتبال-۱", "time": "۱ ساعت پیش", "summary" :"خلاصه‌ی خبر ۱"},
                    {"title": "موردعلاقه-فوتبال-۲", "time": "۲ ساعت پیش", "summary" :"خلاصه‌ی خبر ۲"},
                    {"title": "موردعلاقه-فوتبال-۳", "time": "۳ ساعت پیش", "summary" :"خلاصه‌ی خبر ۳"},
                    {"title": "موردعلاقه-فوتبال-۱", "time": "۱ ساعت پیش", "summary" :"خلاصه‌ی خبر ۱"},
                    {"title": "موردعلاقه-فوتبال-۲", "time": "۲ ساعت پیش", "summary" :"خلاصه‌ی خبر ۲"},
                    {"title": "موردعلاقه-فوتبال-۳", "time": "۳ ساعت پیش", "summary" :"خلاصه‌ی خبر ۳"},
                    {"title": "موردعلاقه-فوتبال-۱", "time": "۱ ساعت پیش", "summary" :"خلاصه‌ی خبر ۱"},
                    {"title": "موردعلاقه-فوتبال-۲", "time": "۲ ساعت پیش", "summary" :"خلاصه‌ی خبر ۲"},
                    {"title": "موردعلاقه-فوتبال-۳", "time": "۳ ساعت پیش", "summary" :"خلاصه‌ی خبر ۳"},
                ];
            }  else {
                return [
                    {"title": "فوتبال-1", "time": "۱ ساعت پیش", "summary" :"خلاصه‌ی خبر ۱"},
                    {"title": "فوتبال-۲", "time": "۲ ساعت پیش", "summary" :"خلاصه‌ی خبر ۲"},
                    {"title": "فوتبال-۳", "time": "۳ ساعت پیش", "summary" :"خلاصه‌ی خبر ۳"},
                    {"title": "فوتبال-۱", "time": "۱ ساعت پیش", "summary" :"خلاصه‌ی خبر ۱"},
                    {"title": "فوتبال-۲", "time": "۲ ساعت پیش", "summary" :"خلاصه‌ی خبر ۲"},
                    {"title": "فوتبال-۳", "time": "۳ ساعت پیش", "summary" :"خلاصه‌ی خبر ۳"},
                    {"title": "فوتبال-۱", "time": "۱ ساعت پیش", "summary" :"خلاصه‌ی خبر ۱"},
                    {"title": "فوتبال-۲", "time": "۲ ساعت پیش", "summary" :"خلاصه‌ی خبر ۲"},
                    {"title": "فوتبال-۳", "time": "۳ ساعت پیش", "summary" :"خلاصه‌ی خبر ۳"},
                ];
            }
        } else {
            if (fav){
                return [
                    {"title": "موردعلاقه-بسکتبال-۱", "time": "۱ ساعت پیش", "summary" :"خلاصه‌ی خبر ۱"},
                    {"title": "موردعلاقه-بسکتبال-۲", "time": "۲ ساعت پیش", "summary" :"خلاصه‌ی خبر ۲"},
                    {"title": "موردعلاقه-بسکتبال-۳", "time": "۳ ساعت پیش", "summary" :"خلاصه‌ی خبر ۳"},
                    {"title": "موردعلاقه-بسکتبال-۱", "time": "۱ ساعت پیش", "summary" :"خلاصه‌ی خبر ۱"},
                    {"title": "موردعلاقه-بسکتبال-۲", "time": "۲ ساعت پیش", "summary" :"خلاصه‌ی خبر ۲"},
                    {"title": "موردعلاقه-بسکتبال-۳", "time": "۳ ساعت پیش", "summary" :"خلاصه‌ی خبر ۳"},
                    {"title": "موردعلاقه-بسکتبال-۱", "time": "۱ ساعت پیش", "summary" :"خلاصه‌ی خبر ۱"},
                    {"title": "موردعلاقه-بسکتبال-۲", "time": "۲ ساعت پیش", "summary" :"خلاصه‌ی خبر ۲"},
                    {"title": "موردعلاقه-بسکتبال-۳", "time": "۳ ساعت پیش", "summary" :"خلاصه‌ی خبر ۳"},
                ];
            } else {
                return [
                    {"title": "بسکتبال-۱", "time": "۱ ساعت پیش", "summary" :"خلاصه‌ی خبر ۱"},
                    {"title": "بسکتبال-۲", "time": "۲ ساعت پیش", "summary" :"خلاصه‌ی خبر ۲"},
                    {"title": "بسکتبال-۳", "time": "۳ ساعت پیش", "summary" :"خلاصه‌ی خبر ۳"},
                    {"title": "بسکتبال-۱", "time": "۱ ساعت پیش", "summary" :"خلاصه‌ی خبر ۱"},
                    {"title": "بسکتبال-۲", "time": "۲ ساعت پیش", "summary" :"خلاصه‌ی خبر ۲"},
                    {"title": "بسکتبال-۳", "time": "۳ ساعت پیش", "summary" :"خلاصه‌ی خبر ۳"},
                    {"title": "بسکتبال-۱", "time": "۱ ساعت پیش", "summary" :"خلاصه‌ی خبر ۱"},
                    {"title": "بسکتبال-۲", "time": "۲ ساعت پیش", "summary" :"خلاصه‌ی خبر ۲"},
                    {"title": "بسکتبال-۳", "time": "۳ ساعت پیش", "summary" :"خلاصه‌ی خبر ۳"},
                ];
            }
        }
    }
}

export default MainPageNewsContainer