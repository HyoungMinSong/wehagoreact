import React from "react";
import { styled } from "styled-components";
import CompanyListItem from "./CompanyListItem";

const Wrapper = styled.div`
    max-height: 154px;
    padding: ${props => (props.exceedmaxheight === 'true' ? '3px 5px 10px 10px' : '3px 10px 10px 10px')} ;

    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 5px; 
    }

    &::-webkit-scrollbar-thumb {
        height: 30%;
        background: #808080;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(33, 122, 244, .1);
    }
`;

function CompanyList(props) {
    const {setCompanyModalOpen, company, companyName, setCompanyName} = props;
    const exceedmaxheight = (company.length * (45 + 7) > 154).toString();

    return(
        <Wrapper exceedmaxheight={exceedmaxheight}>
            {company.map((item) => {
                return (
                    <CompanyListItem item={item} setCompanyModalOpen={setCompanyModalOpen} companyName={companyName} setCompanyName={setCompanyName} key={item.t_company_name} />
                );
            })}
        </Wrapper>
    );
}

export default CompanyList;