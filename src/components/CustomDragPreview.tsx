import React from "react";
import { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";
import { CustomData } from "./../types.ts";
import styles from "./CustomDragPreview.module.css";

type Props = {
    monitorProps: DragLayerMonitorProps<CustomData>;
};

export const CustomDragPreview: React.FC<Props> = (props) => {
    const item = props.monitorProps.item;

    return (
        <div className={styles.root}>
            <div className={styles.label}>{item.text}</div>
        </div>
    );
};
