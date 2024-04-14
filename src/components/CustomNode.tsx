import {NodeModel, useDragOver} from "@minoru/react-dnd-treeview";
import {CustomData} from "../types.ts";
import {useState} from "react";
import styles from "./CustomNobe.module.css"
import {ArrowRight, Check, Close, Edit} from "@mui/icons-material";
import {IconButton, TextField, Typography} from "@mui/material";

type CustomNodeProps = {
    node: NodeModel<CustomData>
    depth: number
    isOpen: boolean
    onToggle: (id: NodeModel["id"]) => void
    onTextChange: (id: NodeModel["id"], value: string) => void
}

export const CustomNode: React.FC<CustomNodeProps> = (props) => {
    const {id, text} = props.node
    const [visibleInput, setVisibleInput] = useState<boolean>(false)
    const [labelText, setLabelText] = useState<string>("")
    const indent = props.depth * 24

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        props.onToggle(props.node.id);
    };

    const handleShowInput = () => {
        setVisibleInput(true)
    }

    const handelCancel = () => {
        setLabelText(text)
        setVisibleInput(false)
    }

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabelText(e.target.value)
    }

    const handelSubmit = () => {
        setVisibleInput(false)
        props.onTextChange(id, labelText)
    }

    const dragOverProps = useDragOver(id, props.isOpen, props.onToggle)

    return (
        <div className={`tree-node ${styles.root}`} style={{ paddingInlineStart: indent}} {...dragOverProps}>
        <div className={`tree-node ${styles.expandIconWrapper} ${props.isOpen ? styles.isOpen : "" }`}
        >
            {props.node.droppable && (
                <div onClick={handleToggle}>
                    <ArrowRight />
                </div>
            )}
        </div>
        <div className={styles.labelGridItem}>
            {visibleInput ? (
                <div className={styles.inputWrapper}>
                    <TextField
                    className={`${styles.textField} ${styles.nodeInput}`}
                    value={labelText}
                    onChange={handleChangeText}
                    />
                    <IconButton
                        className={`${styles.editButton}`}
                        onClick={handelSubmit}
                        disabled={labelText === ""}
                    >
                        <Check className={styles.editIcon} />
                    </IconButton>
                    <IconButton className={styles.editButton} onClick={handelCancel}>
                        <Close className={styles.editIcon} />
                    </IconButton>
                </div>
            ) : (
                <div className={styles.inputWrapper}>
                <Typography variant="body2" className={styles.nodeLabel}>
                    {props.node.text}
                </Typography>
                <IconButton className={styles.editButton} onClick={handleShowInput}>
                    <Edit className={styles.editIcon} />
                </IconButton>
                </div>
            )}
        </div>
        </div>
    )
}