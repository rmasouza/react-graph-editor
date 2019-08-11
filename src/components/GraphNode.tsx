import React, {FC, PropsWithChildren, useState, CSSProperties, MouseEvent, unstable_Profiler, useRef, useEffect} from 'react';
import Position from '../models/Position';

interface IGraphNodeProps {
    initialPosition: Position;
    index?: number;
    parentHeight?: number,
    parentWidth?: number,
}

export type GraphNodeProps = PropsWithChildren<IGraphNodeProps>;

const GraphNode: FC<GraphNodeProps> = (props: GraphNodeProps) => {
    const { initialPosition, index } = props;
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [offsetPosition, setOffsetPosition] = useState<Position>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const itemRef  = useRef<HTMLDivElement>(null);
    
    const style: CSSProperties = {
        position: 'absolute',
        left: position.x,
        top: position.y,
        border: 'solid 1px',
        padding: 4,
        borderRadius: 5,
        backgroundColor: '#fff',
        width: 128,
        cursor: 'move'
    } 

    useEffect(() => {
        const tmp: Position = {
            x: initialPosition.x, 
            y: initialPosition.y,
        }
        setPosition(tmp)
    }, [])

    const onMouseDawn = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true)
        
        const tmpOffset: Position = {
            x: itemRef.current!.offsetLeft -  e.clientX, 
            y: itemRef.current!.offsetTop - e.clientY,
        }

        setOffsetPosition(tmpOffset)
    }

    const onMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
        setIsDragging(false)
    }

    const onMouseUp = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        
        setIsDragging(false)
        setOffsetPosition({
            x: 0,
            y: 0
        })
    }

    const onClick = (e: MouseEvent<HTMLDivElement>) => {
        if(isDragging) {return};

        alert('its a click');
    }

    const dragItem = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        if(!isDragging) {return}
        const x = offsetPosition.x + e.clientX;
        const y = offsetPosition.y + e.clientY;

        const tmpPosition: Position = {
            x:  x > 0 ? Math.min(x, props.parentWidth!-itemRef.current!.offsetWidth) : Math.max(x, 0), 
            y:  y > 0 ? Math.min(y, props!.parentHeight!-itemRef.current!.offsetHeight) : Math.max(y, 0),
        }

        setPosition(tmpPosition)
    }

    return (
        <div ref={itemRef} style={style} onMouseDown={onMouseDawn} onMouseUp={onMouseUp} onMouseMove={dragItem} onMouseLeave={onMouseLeave}>
            <div>{isDragging? 'SIM' : 'NAO'}</div>
            <div>Index {index}</div>
            <div>Position {JSON.stringify(position)}</div>
            {props.children}
        </div>
    )
}

GraphNode.defaultProps = {
    parentWidth: 0,
    parentHeight: 0
}

export default GraphNode;