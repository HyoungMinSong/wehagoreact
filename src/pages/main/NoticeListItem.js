import { styled } from "styled-components";
import NoticeModal from "./NoticeModal";
import { useState } from "react";

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 350px;
    margin: 7px;
    color: black;
    cursor: pointer;

    & > div {
        max-width: 240px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    & > div > img {
        width: 25px;
        height: 25px;
        margin-right: 15px;
    }

    & > div > span {
        font-size: 14px;
        font-weight: bold;
    }

    & > small {
        font-size: 14px;
        color: gray;
    }
`;

function NoticeListItem(props) {
    const { notice } = props;
    const [showModal, setShowModal] = useState(false);

    const showNoticeModal = () => {
        setShowModal(true);
    }

    return (
        <>
            <Item className="notice" onClick={showNoticeModal}>
                <div>
                    <img src="https://cdn-icons-png.flaticon.com/128/1322/1322188.png"/>
                    <span>{notice.t_notice_title}</span>
                </div>
                <small>{notice.t_notice_date}</small>
            </Item>
            <NoticeModal showModal={showModal} setShowModal={setShowModal} notice={notice} />
        </>
    );
}

export default NoticeListItem;