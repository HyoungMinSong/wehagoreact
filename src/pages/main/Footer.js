import React from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    text-align: center;
    padding: 20px 0px;
    color: white;
`;

const A = styled.a`
    text-decoration: none;
    line-height: 1px;
    color: white;

    &::after {
        content: '';
        display: inline-block;
        margin: 0px 7px;
        width: 1px;
        height: 11px;
        background-color: #dddddd;
    }
`;

function Footer() {
    return(
        <Wrapper>
            <A href="#">
                <small>WEHAGO 소개</small> 
            </A>
            <A href="#">
                <small>이용약관</small>
            </A>
            <A href="#">
                <small>개인정보처리방침</small>
            </A>
            <A href="#">
                <small>WEHAGO 고객센터</small>
            </A>
            <A href="#">
                <small>다운로드센터</small>
            </A>
            <small> Copyright ⓒ DOUZON BIZON. All rights reseved.</small>
        </Wrapper>
    )
}

export default Footer;