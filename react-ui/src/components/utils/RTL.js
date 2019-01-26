import React from "react";
import {create} from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import {
    createGenerateClassName,
    createMuiTheme,
    jssPreset,
    MuiThemeProvider,
    withStyles
} from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class text generator.
const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: false,
    productionPrefix: 'qas',
});

const theme = createMuiTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});

function RTL2(props) {
    return (
        <JssProvider jss={jss} generateClassName={generateClassName}>
            {props.children}
        </JssProvider>
    );
}
class RTL extends React.Component{
    render() {
        return (
            <RTL2>
                <MuiThemeProvider theme={theme}>
                    {this.props.children}
                </MuiThemeProvider>
            </RTL2>
        );
    }
}

export default withStyles({ withTheme: true })(RTL);
