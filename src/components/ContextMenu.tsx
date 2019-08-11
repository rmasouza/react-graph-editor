import React, { FC, PropsWithChildren, CSSProperties, useRef } from 'react';
import Position from '../models/Position';

interface IContextMenuProps {
    show: boolean;
    position: Position;
    onClose: () => void;
}
type ContextMenuProps = PropsWithChildren<IContextMenuProps>;

const ContextMenu: FC<ContextMenuProps> = (props: ContextMenuProps) => {
    const { show, onClose, position, children } = props;
    const itemRef  = useRef<HTMLDivElement>(null);

    const style: CSSProperties = {
        padding: 4, 
        backgroundColor: 'white', 
        borderRadius: 5, 
        display: show ? 'block' : 'none', 
        zIndex: 101,
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: 'pointer'
    }

    return (
        <>  
            <section style={style} ref={itemRef}>
                {children}
            </section>
            <div onClick={onClose} style={{position: 'fixed', zIndex: 1, display: show ? 'block' : 'none', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,255,255, 0.0)'}}></div>
        </>
    )
}

export default ContextMenu;
