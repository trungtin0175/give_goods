import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import { useState } from 'react';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);
function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const users = [
        {
            id: 1,
            name: 'Trung Tín',
            message: 'alo alo',
        },
        {
            id: 2,
            name: 'Nguyễn Văn A',
            message: 'Xin chào!',
        },
        {
            id: 3,
            name: 'Phạm Thị B',
            message: 'Hôm nay trời đẹp quá!',
        },
    ];

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const input = document.getElementById('chat');
        const newMessage = {
            content: input.value,
            sender: 'me',
        };
        setMessages([...messages, newMessage]);
        input.value = '';
    };

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('side-bar')}>
                <h4 className={cx('header')}>My Chats</h4>
                <div className={cx('body')}>
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className={cx('user', { active: user.id === selectedUser?.id })}
                            onClick={() => handleUserClick(user)}
                        >
                            <span className={cx('user-name')}>{user.name}</span>
                            <p className={cx('user-message')}>{user.message}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className={cx('content')}>
                <div className={cx('chat-box')}>
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={cx('message', {
                                'message-me': message.sender === 'me',
                                'message-other': message.sender === 'other',
                            })}
                        >
                            {message.content}
                        </div>
                    ))}
                </div>
                <div className={cx('chat')}>
                    <input
                        id="chat"
                        value={message}
                        onChange={(e) => handleChange(e.target.value)}
                        className={cx('chat-input')}
                        name="chat"
                        type="text"
                    />
                    <Button primary className={cx('chat-btn')}>
                        Send
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
