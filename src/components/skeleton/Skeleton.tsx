import { Component } from 'react';
import p from '../../lib/print';
import { classNames as cn } from '../../lib/classNames';
import generalStyle from '../../style/style.module.scss';
import stylesCharInfo from '../charInfo/charInfo.module.scss';
import stylesSkeleton from './skeleton.module.scss';

class Skeleton extends Component {
    
    render() {
        //p('Skeleton styles: ', stylesCharInfo); // skeleton__header, skeleton____circle, skeleton____mini, skeleton____block.
        return (
            <>
                <p className={stylesCharInfo.char__select}>Please select a character to see information</p>
                <div className={stylesCharInfo.skeleton}>
                    <div className={cn(generalStyle.pulse, stylesSkeleton.skeleton__header)}>
                        <div className={cn(generalStyle.pulse, stylesSkeleton.skeleton__circle)}></div>
                        <div className={cn(generalStyle.pulse, stylesSkeleton.skeleton__mini)}></div>
                    </div>
                    <div className={cn(generalStyle.pulse, stylesSkeleton.skeleton__block)}></div>
                    <div className={cn(generalStyle.pulse, stylesSkeleton.skeleton__block)}></div>
                    <div className={cn(generalStyle.pulse, stylesSkeleton.skeleton__block)}></div>
                    <div className={cn(generalStyle.pulse, stylesSkeleton.skeleton__block)}></div>
                    <div className={cn(generalStyle.pulse, stylesSkeleton.skeleton__block)}></div>
                    <div className={cn(generalStyle.pulse, stylesSkeleton.skeleton__block)}></div>
                    <div className={cn(generalStyle.pulse, stylesSkeleton.skeleton__block)}></div>
                    <div className={cn(generalStyle.pulse, stylesSkeleton.skeleton__block)}></div>
                </div>
            </>
        )
    }
}

export default Skeleton;