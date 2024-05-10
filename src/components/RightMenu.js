import { StatusCard } from "./StatusCard";
import { Developer } from "./Developer";
import { getCookie } from "../utils/TypistCookie";
import { useEffect, useState } from "react";
import { NoDataCard } from "./NoDataCard";
import {
    DefaultIcon,
    EditButton,
    Logout,
    MenuContainer,
    MenuContents,
    Nickname,
    Profile,
    ProfileEditButtons,
    ProfileImage,
    RecentCards,
    StatTitle,
    StatusContatiner,
    UserIcon,
} from "./RightMenu.styled";
import { NotificationBell } from "./NotificationBell";

export function RightMenu({ userData, isVisible, setLoginModalOpen }) {
    const [average, setAverage] = useState({
        cpm: 0,
        acc: 0,
        err: 0,
    });
    const [best, setBest] = useState(null);
    const [resent, setResent] = useState([]);

    function calculateResult() {
        const results = getCookie("result");
        if (!results) {
            setResent([]);
            return;
        }
        results.sort((a, b) => {
            if (a.cpm > b.cpm) return -1;
            if (a.cpm < b.cpm) return 1;
            if (a.acc > b.acc) return -1;
            if (a.acc < b.acc) return 1;
            return 0;
        });
        setBest(results[0]);
        const avgCpm =
            results.reduce((acc, cur) => acc + cur.cpm, 0) / results.length;
        const avgAcc =
            results.reduce((acc, cur) => acc + cur.acc, 0) / results.length;
        const avgErr =
            results.reduce((acc, cur) => acc + cur.err, 0) / results.length;
        setAverage({
            cpm: Math.round(avgCpm),
            acc: Math.round(avgAcc),
            err: Math.round(avgErr),
        });
        results.sort((a, b) => {
            // 최근 결과 순으로 정렬
            if (a.date > b.date) return -1;
            if (a.date < b.date) return 1;
            return 0;
        });
        setResent(results);
    }
    useEffect(() => {
        calculateResult();
    }, []);

    const isLogin = false;

    return (
        <MenuContainer $isVisible={isVisible}>
            {isLogin && <NotificationBell number={100} />}
            {/* 로그인 부분 */}
            <MenuContents>
                {isLogin ? (
                    <>
                        <Profile>
                            <ProfileImage>
                                <UserIcon src={""} alt="User Profile" />
                            </ProfileImage>
                            <Nickname>{userData.name}</Nickname>
                        </Profile>
                        <ProfileEditButtons>
                            <Logout>logout</Logout>
                            {false && <EditButton name="edit profile" />}
                        </ProfileEditButtons>
                    </>
                ) : (
                    <>
                        <ProfileImage>
                            <DefaultIcon />
                        </ProfileImage>
                        <Nickname>Guest</Nickname>
                        <ProfileEditButtons>
                            <Logout
                                onClick={() => {
                                    setLoginModalOpen(true);
                                }}
                            >
                                login
                            </Logout>
                        </ProfileEditButtons>
                    </>
                )}
            </MenuContents>
            <StatusContatiner>
                <StatTitle>Best</StatTitle>
                {best ? (
                    <StatusCard
                        title={best.title}
                        author={best.author}
                        cpm={best.cpm}
                        acc={best.acc}
                        err={best.err}
                    />
                ) : (
                    <NoDataCard />
                )}
                <StatTitle>Average</StatTitle>
                <StatusCard
                    cpm={average.cpm}
                    acc={average.acc}
                    err={average.err}
                />
                <StatTitle>Recent</StatTitle>
                <RecentCards>
                    {resent.map((result) => (
                        <StatusCard
                            key={result.date}
                            title={result.title}
                            author={result.author}
                            cpm={result.cpm}
                            acc={result.acc}
                            err={result.err}
                        />
                    ))}
                </RecentCards>
            </StatusContatiner>
            <Developer />
        </MenuContainer>
    );
}
