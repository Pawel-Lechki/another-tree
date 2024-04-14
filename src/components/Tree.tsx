import {useState} from "react";
import {DndProvider, getBackendOptions, MultiBackend, NodeModel, Tree, DragLayerMonitorProps} from "@minoru/react-dnd-treeview";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./theme.ts";
import {CustomData} from "../types.ts";
import {CustomNode} from "./CustomNode.tsx";
import {CustomDragPreview} from "./CustomDragPreview.tsx";
import styles from "./CustomDragPreview.module.css"
import SampleData from "./sample_data.json"

const TreeComponent = () => {
    const [treeData, setTreeData] = useState<NodeModel[]>(SampleData)

    const handleDrop = (newTree: NodeModel[]) => setTreeData(newTree)
    const handleTextChange = (id: NodeModel["id"], value: string) => {
        const newTree = treeData.map(node => {
            if(node.id === id) {
                return {
                    ...node,
                    text: value
                }
            }

            return node
        })

        setTreeData(newTree)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                <div>
                    <Tree
                        tree={treeData}
                        rootId={0}
                        render={(
                            node: NodeModel<CustomData>,
                            { depth, isOpen, onToggle }
                        ) => (
                            <CustomNode
                                node={node}
                                depth={depth}
                                isOpen={isOpen}
                                onToggle={onToggle}
                                onTextChange={handleTextChange}
                            />
                        )}
                        dragPreviewRender={(
                            monitorProps: DragLayerMonitorProps<CustomData>
                        ) => <CustomDragPreview monitorProps={monitorProps} />}
                        onDrop={handleDrop}
                        classes={{
                            root: styles.treeRoot,
                            draggingSource: styles.draggingSource,
                            dropTarget: styles.dropTarget
                        }}
                        sort={false}
                    />
                </div>
            </DndProvider>
        </ThemeProvider>
    )
}

export default TreeComponent;