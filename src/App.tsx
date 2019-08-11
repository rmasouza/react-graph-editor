import React, { CSSProperties } from 'react';
import GraphNode from './components/GraphNode';
import GraphView from './components/GraphView';

const App: React.FC = () => {
    const style: CSSProperties = {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'aliceblue'
    }
    return (
        <article>
            <GraphView style={style}>
                <GraphNode>
                    1
                </GraphNode>   
                <GraphNode>
                    2
                </GraphNode>   
            </GraphView>
        </article>
    )
};

export default App;
