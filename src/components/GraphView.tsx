import React, { useRef, PropsWithChildren, FC, HTMLAttributes, useEffect, useState } from "react";
import { GraphNodeProps } from './GraphNode';
import { userInfo } from 'os';


interface IGraphViewProps {

}

type GraphViewProps = PropsWithChildren<IGraphViewProps> & HTMLAttributes<HTMLDivElement>;
type Size = {width: number, height: number};

const GraphView: FC<GraphViewProps> = (props: GraphViewProps) => {
    const { children, ...otherProps } = props;
    const [isMounted, setIsMounted] = useState(false);
    const [size, setSize] = useState<Size>({width: 0, height: 0});
    const grapViewRef = useRef<HTMLDivElement>(null);

    let childrens = !isMounted ? undefined : React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
            throw Error(`${child} is not a valid Tab`);
        }

        return React.cloneElement<GraphNodeProps>(child, {
            height: size.height,
            width: size.width,
        })

    });

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
        <article {...otherProps} ref={grapViewRef}>
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
                childrens
            }
        </article>
    )
}

export default GraphView;