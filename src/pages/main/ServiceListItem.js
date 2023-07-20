import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const Item = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 80px;
    margin: 20px 10px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    border-radius: 7px;

    & > small {
        font-size: 12px;
    }
`;

function ServiceListItem(props) {
    const {item, onClick} = props;
    return (
        <Item>
            <img src="https://cdn-icons-png.flaticon.com/128/11324/11324302.png" alt="서비스 이미지" width="80px" height="80px"/>
            <small>{item.name}</small>
        </Item>
    );
}

export default ServiceListItem;