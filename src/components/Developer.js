import { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Github } from "../assets/svg/github.svg";

const DeveloperDescription = styled.div`
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const DescriptText = styled.span`
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const DeveloperInfo = styled.div`
    margin-top: 10px;
    width: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

const InfoCell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const DeveloperName = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DeveloperLabel = styled.label`
    font-size: 12px;
    font-weight: 1000;
`;
const DeveloperValue = styled.span`
    font-size: 12px;
`;
const GithubLink = styled.a`
    margin-left: 5px;
`;

const ProfileImage = styled.span`
    background-color: white;
    overflow: hidden;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const UserIcon = styled.img`
    width: 40px;
    height: 40px;
    object-fit: cover;
`;

const Nickname = styled.span`
    font-size: 15px;
    font-weight: bold;
`;

export const Developer = () => {
    const [developer, setDeveloper] = useState([]);
    useEffect(() => {
        fetch("https://api.github.com/users/seokkkkkk")
            .then((response) => response.json())
            .then((data) => setDeveloper(data));
    }, []);

    console.log(developer);

    return (
        <DeveloperDescription>
            <DescriptText>Developer</DescriptText>
            <ProfileImage>
                <UserIcon src={developer.avatar_url} />
            </ProfileImage>
            <DeveloperName>
                <Nickname>{developer.login}</Nickname>
                <GithubLink
                    href={developer.html_url}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Github width="20px" height="20px" />
                </GithubLink>
            </DeveloperName>
            <DeveloperInfo>
                <InfoCell>
                    <DeveloperLabel>Followers</DeveloperLabel>
                    <DeveloperValue>{developer.followers}</DeveloperValue>
                </InfoCell>
                <InfoCell>
                    <DeveloperLabel>location</DeveloperLabel>
                    <DeveloperValue>{developer.location}</DeveloperValue>
                </InfoCell>
            </DeveloperInfo>
        </DeveloperDescription>
    );
};
