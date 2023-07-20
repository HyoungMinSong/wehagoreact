import React from "react";
import { styled } from "styled-components";

const Item = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 45px;
    margin-top: 7px;
    text-align: left;
    font-size: 17px;
    border: none;
    border-radius: 7px;
    cursor: pointer;

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
    const {item, setCompanyModalOpen, companyName, setCompanyName} = props;

    const handleCompanyItemClick = () => {
        setCompanyName(item.name);
        setCompanyModalOpen(false);
    };

    return (
        <Item onClick={handleCompanyItemClick}>
            <div>
                <img src="https://cdn-icons-png.flaticon.com/128/7118/7118291.png" alt="회사" />
                <small>{item.name}</small>
            </div>
            {item.name === companyName && <img src="https://cdn-icons-png.flaticon.com/128/6520/6520110.png" alt="체크" width="25px" height="25px" /> }
        </Item>
    );
}

export default CompanyListItem;