import React, { CSSProperties } from 'react';
import DraggableItem from './components/DraggableItem';

const App: React.FC = () => {
    const style: CSSProperties = {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'aliceblue'
    }
    return (
        <div style={style}>
            <DraggableItem width={screen.availWidth} height={screen.availHeight}>
                1
            </DraggableItem>   
            <DraggableItem width={screen.availWidth} height={screen.availHeight}>
                2
            </DraggableItem>   
        </div>
    )
};

export default App;
