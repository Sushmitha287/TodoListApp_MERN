import React, { useState } from 'react';
export default function Todo(props) {
    const { todo, setTodos } = props;
    const [editing, setEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(todo.todo);


//updating todo for status
    const updateTodo = async (todoId, todoStatus) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ status: todoStatus }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await res.json();

        if (json.acknowledged) {
            props.setTodos(currentTodos => {
                return currentTodos.map((currentTodo) => {
                    if (currentTodo._id === todoId) {
                        return { ...currentTodo, status: !currentTodo.status };
                    }
                    return currentTodo;
                });
            });
        }
    };

// delete function
    const deleteTodo = async (todoId) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "DELETE"
        });
        const json = await res.json();
        
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos
                .filter((currentTodo) => (currentTodo._id !== todoId));
            });
        }
    }

    // edit button function
    const handleEdit = () => {
        setEditing(true);
    };
// save button function
    const handleSave = async () => {
        try {
            const res = await fetch(`/api/todos/${todo._id}`, {
                method: "PUT",
                body: JSON.stringify({ todo: editedContent }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await res.json();
            
            if (json) {
                // Assuming the response contains updated todo data
                // Update the todo content in the UI
                setEditing(false); // Exit edit mode
                setTodos(currentTodos => {
                    return currentTodos.map(currentTodo => {
                        if (currentTodo._id === todo._id) {
                            return { ...currentTodo, todo: editedContent };
                        }
                        return currentTodo;
                    });
                });
            } else {
                console.error("Failed to update todo.");
                // Handle error scenario if needed
            }
        } catch (error) {
            console.error("Error updating todo:", error);
            // Handle error scenario if needed
        }
    };

    
// cancel button function
    const handleCancel = () => {
        setEditing(false);
        setEditedContent(todo.todo);
    };

    

    return (
        <div className="todo">
            {editing ? (
                <input
                    type="text"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                />
            ) : (
                <p>{todo.todo}</p>
            )}
            <div className="mutations">
                { editing ? (
                    <>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button
                            className="todo__status"
                            onClick={() => updateTodo(todo._id, todo.status)}
                        >
                            {(todo.status) ? "☑" : "☐"}
                        </button>
                        <button
                            className="todo__edit"
                            onClick={handleEdit}
                        >
                            ✏️
                        </button>
                        <button
                            className="todo__delete"
                            onClick={() => deleteTodo(todo._id)}
                        >
                            🗑️
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}




