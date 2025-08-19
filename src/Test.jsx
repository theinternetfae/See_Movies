import React, { use, useEffect, useState } from 'react';

function Card({title}) {
    const [count, setCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        console.log(`${title} has been liked: ${hasLiked}`)
    }, [hasLiked]);

    return(
        <div className="card" onClick={() => setCount(c => c + 1)}>

            <h2>{title}<br/>{count || null}</h2>
            <button onClick={() => {
                setHasLiked(!hasLiked);
            }}>
                {hasLiked ? '💚' : '🤍'}
            </button>
        </div>
    )
}

function Test() {

    return(
        <div className="card-container">
            <Card title="13 reasons why" rating={5} isCool={true}/>
            <Card title="Pretty woman" />
            <Card title="13 going on 30"/>  
        </div>
    )
}

export default Test;