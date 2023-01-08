import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button, Select, Divider, Popconfirm } from 'antd';


const TodoListTable = ({ todoList,setTodoList, handleAdd, handleDelete, handleSave }) => {
    const [form] = Form.useForm();
    // const [todoList, setTodoList] = useState([]);

    const [editingKey, setEditingKey] = useState('');

    const isEditing = record => record.key === editingKey;

    const edit = record => {
        form.setFieldsValue({
            timestampCreated: '',
            title: '',
            description: '',
            dueDate: '',
            tag: '',
            status: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async key => {
        try {
            const row = await form.validateFields();
            const newData = [...todoList];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                handleSave(newData[index]);
            } else {
                newData.push(row);
                handleAdd(row);
            }
            setTodoList(newData);
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const mergedColumns = [
        {
            title: 'Timestamp Created',
            dataIndex: 'timestampCreated',
            key: 'timestampCreated',
            sorter: (a, b) => a.timestampCreated - b.timestampCreated,
            render: (_, record) => {
                return isEditing(record) ? (
                    <Form form={form} component={false}>
                        <Form.Item
                            name="timestampCreated"
                            rules={[
                                {
                                    required: true,
                                    message: 'Timestamp created is required',
                                },
                            ]}
                        >
                            <Input disabled />
                        </Form.Item>
                    </Form>
                ) : (
                    record.timestampCreated
                );
            }
        },

        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
            filters: [
                {
                    text: 'Tag 1',
                    value: 'tag 1',
                },
                {
                    text: 'Tag 2',
                    value: 'tag 2',
                },
                // other filters go here
            ],
            onFilter: (value, record) => record.tag.indexOf(value) === 0,
            render: (_, record) => {
                return isEditing(record) ? (
                    <Form.Item
                        name="tag"
                        rules={[
                            {
                                max: 100,
                                message: 'Tag must be 100 characters or less',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                ) : (
                    record.tag
                );
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'OPEN',
                    value: 'OPEN',
                },
                {
                    text: 'WORKING',
                    value: 'WORKING',
                },
                {
                    text: 'DONE',
                    value: 'DONE',
                },
                {
                    text: 'OVERDUE',
                    value: 'OVERDUE',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: (_, record) => {
                return isEditing(record) ? (
                    <Form.Item
                        name="status"
                        rules={[
                            {
                                required: true,
                                message: 'Status is required',
                            },
                        ]}
                    >
                        <Select>
                            <Select.Option value="OPEN">OPEN</Select.Option>
                            <Select.Option value="WORKING">WORKING</Select.Option>
                            <Select.Option value="DONE">DONE</Select.Option>
                            <Select.Option value="OVERDUE">OVERDUE</Select.Option>
                        </Select>
                    </Form.Item>
                ) : (
                    record.status
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button type="link" onClick={() => save(record.key)}>
                            Save
                        </Button>
                        <Divider type="vertical" />
                        <Button type="link" onClick={cancel}></Button>
                    </span>
                ) : (
                    <span>
                        <Button
                            type="link"
                            disabled={editingKey !== ''}
                            onClick={() => edit(record)}
                        >
                            Edit
                        </Button>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="Are you sure delete this task?"
                            onConfirm={() => handleDelete(record.key)}
                        >
                            <Button type="link">Delete</Button>
                        </Popconfirm>
                    </span>
                );
            },
        },
    ];

    return (
        <Form form={form} component={false}>
            <Table
                dataSource={todoList}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
}

export default TodoListTable;