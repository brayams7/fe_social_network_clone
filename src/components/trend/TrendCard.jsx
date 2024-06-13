import React from 'react';
import { trendList } from '../../data/treadData';
import './trencard.css'
const TrendCard = () => {
    return (
        <div className='trendCard_container'>
            <h3>Tendencias para ti</h3>
            {
                trendList.map((trend, index)=>{
                    return(
                        <div className="trendCard_trend" key={index}>
                            <span>#{trend.name}</span>
                            <span>{trend.shares}k compartidos</span>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default TrendCard;