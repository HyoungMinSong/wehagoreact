import NoticeListItem from "./NoticeListItem";
import { styled } from "styled-components";

const NoticeWrapper = styled.div`
    margin-top: 10px;
`;

function NoticeList(props) {
    const {notices, onClickItem, setNoticeModalOpen} = props;
    return (
        <NoticeWrapper>
            {notices.map((notice) => {
                return (
                    <NoticeListItem
                        notice={notice}
                        key={notice.t_notice_no}
                        setNoticeModalOpen={setNoticeModalOpen}
                        onClick={() => {
                            onClickItem(notice);
                        }}
                    />
                );
            })}
        </NoticeWrapper>
    );
}

export default NoticeList;