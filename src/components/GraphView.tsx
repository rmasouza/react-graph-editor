import React, { useRef, PropsWithChildren, FC, HTMLAttributes, MouseEvent, useEffect, useState } from "react";
import GraohNode, { GraphNodeProps } from './GraphNode';
import Position from '../models/Position';
import Node from '../models/Node';
import ContextMenu from './ContextMenu';
import GraphNode from './GraphNode';

interface IGraphViewProps {

}

type GraphViewProps = PropsWithChildren<IGraphViewProps> & HTMLAttributes<HTMLDivElement>;
type Size = {width: number, height: number};

const GraphView: FC<GraphViewProps> = (props: GraphViewProps) => {
    const { children, ...otherProps } = props;
    const [isMounted, setIsMounted] = useState(false);
    const [size, setSize] = useState<Size>({width: 0, height: 0});
    const [menuPositon, setMenuPosition] = useState<Position>({x: 0, y:0});
    const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
    const [nodes, setNodes] = useState<Array<Node>>([ new Node({x: 100, y: 100})])

    const grapViewRef = useRef<HTMLDivElement>(null);

    // let childrens = !isMounted ? undefined : React.Children.map(children, (child, index) => {
    //     if (!React.isValidElement(child)) {
    //         throw Error(`${child} is not a valid Tab`);
    //     }

    //     return React.cloneElement<GraphNodeProps>(child, {
    //         index,
    //         height: size.height,
    //         width: size.width,
    //     })
    // });


    const addNode = () => {
        setNodes([...nodes, new Node(menuPositon)])
        setShowContextMenu(false);
    }

    const onMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        setMenuPosition({
            x: e.clientX, 
            y: e.clientY,
        })

        setShowContextMenu(true);
    }

    useEffect(() => {
        setIsMounted(true)
        if(grapViewRef.current) {
            setSize({
                height: grapViewRef.current!.offsetHeight,
                width: grapViewRef.current!.offsetWidth,
            })
            window.addEventListener("resize", (e) =>  {
                setSize({
                    height: grapViewRef.current!.offsetHeight,
                    width: grapViewRef.current!.offsetWidth,
                })
            });
        }
    }, [])

    return (
        <article {...otherProps} ref={grapViewRef} onContextMenu={onMouseDown}>
            <ContextMenu show={showContextMenu} position={menuPositon} onClose={()=>{setShowContextMenu(false)}}>
                <div style={{padding: 4, textTransform: 'uppercase' }} onClick={addNode}>Adicionar Nó</div>
            </ContextMenu>
            {
                grapViewRef.current != null && 
                <>
                    <div>
                        Height :{grapViewRef.current.offsetHeight}
                    </div>
                    <div>
                        Width :{grapViewRef.current.offsetWidth}
                    </div>
                </>
            }

            {
               isMounted && nodes.map( (it, index) => <GraphNode key={it.id} initialPosition={it.position} index={index} parentHeight={size.height} parentWidth={size.width}/>)   
            }
            
        </article>
    )
}

export default GraphView;