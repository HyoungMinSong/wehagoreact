import React from "react";
import { styled } from "styled-components";
import { useSelector, useDispatch } from 'react-redux';

const Item = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 45px;
    margin-top: 7px;
    text-align: left;
    font-size: 17px;
    border: 1px solid #cccccc;
    border-radius: 7px;
    cursor: pointer;
    box-shadow: 2px 3px 5px 0px gray;
    background: white;

    & > div {
        display: flex;
        align-items: center;
    }

    & > div > img {
        margin-right: 10px;
        width: 20px;
        height: 20px;
    }
`;

function CompanyListItem(props) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.loginUserData);
    const {item, setCompanyModalOpen, companyName, setCompanyName} = props;

    // 쿠키에 데이터 저장
    function setCompanyCookie(name, value, days) {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    const handleCompanyItemClick = () => {
        dispatch(setCompanyName(item.t_company_name));
        setCompanyCookie(user.id + 'LastSelectedCompanyName', encodeURI(item.t_company_name), 30);
        setCompanyModalOpen(false);
    };

    return (
        <Item onClick={handleCompanyItemClick}>
            <div>
                <img src="https://cdn-icons-png.flaticon.com/128/7118/7118291.png" alt="회사" />
                <small>{item.t_company_name}</small>
            </div>
            {item.t_company_name === companyName && <img src="https://cdn-icons-png.flaticon.com/128/6520/6520110.png" alt="체크" width="25px" height="25px" /> }
        </Item>
    );
}

export default CompanyListItem;