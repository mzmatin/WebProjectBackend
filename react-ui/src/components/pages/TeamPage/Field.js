import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import ImageAvatars from "../../utils/ImageAvatars";

const styles = theme => ({

});

class Field extends React.Component{
    render() {
        const { classes} = this.props;
        const pos = this.getPos(this.props.position);
        let avatar = <div></div>;
        if (pos !== null){
            avatar = (
                <div style={{
                    marginRight: pos.y.toString() +'px',
                    marginTop: pos.x.toString() + 'px',
                }}>
                  <ImageAvatars  avatar={this.props.address} size={60}/>
                </div>
            );
        }
        return (
            <div style={{
                backgroundImage: 'url('+this.props.src +')',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                width: this.props.width,
                height: this.props.height,
            }}>
                {avatar}
            </div>
        );
    }

    getPos(position) {
        const width = this.props.width;
        const height = this.props.height;
        switch (position) {
            case 'gk':
                return {'x': width/100, 'y':0};
                break;
            case 'dc':
                return {'x':30 * width/100, 'y':0};
                break;
            case 'dr':
                return {'x':40 * width/100, 'y':-height/2};
                break;
            case 'dl':
                return {'x':40 * width/100, 'y':height/2};
                break;
            case 'mc':
                return {'x': 60 * width/100, 'y':0};
                break;
            case 'mr':
                return {'x': 70 * width/100, 'y':-height/2};
                break;
            case 'ml':
                return {'x': 70 * width /100, 'y':height/2};
                break;
            case 'fc':
                return {'x':  width, 'y':0};
                break;
            case 'fr':
                return {'x': 110 * width/100, 'y':-height/2};
                break;
            case 'fl':
                return {'x': 110 * width/100, 'y':height/2};
                break;
            case 'pg':
                return {'x':width, 'y':0};
                break;
            case 'sg':
                return {'x':1.12*width, 'y':height/3};
                break;
            case 'sf':
                return {'x':1.45*width, 'y':-height/4};
                break;
            case 'pf':
                return {'x':1.3*width, 'y':height/4};
                break;
            case 'c':
                return {'x':1.25*width, 'y':-height/4};
        }
        return null;
    }
}

export default withStyles(styles, { withTheme: true })(Field);