import { useEffect, useState } from "react";
import { TextInfo } from "../components/TextInfo";
import { TypingArea } from "../components/TypingArea";
import { ResultModal } from "../components/ResultModal";
import { RightMenu } from "../components/RightMenu";
import { MainMenuBar } from "../components/MainMenuBar";
import { MainBottomMenu } from "../components/MainBottomMenu";
import { getCookie, setCookie } from "../utils/TypistCookie";
import { EndOfText } from "../components/EndAlert";
import {
    Footer,
    List,
    Logo,
    MainBody,
    MainHeader,
    MainLogo,
    MainPage,
} from "./Main.styled";
import { LoginModal } from "../components/LoginModal";

export function Main() {
    const [isLike, setIsLike] = useState(false);
    const [totalTime, setTotalTime] = useState(null);
    const [cpm, setCpm] = useState(0);
    const [acc, setAcc] = useState(0);
    const [err, setErr] = useState(0);
    const [rightMenuOpen, setRightMenuOpen] = useState(false);
    const [bottomMenuOpen, setBottomMenuOpen] = useState(false);
    const [resultReady, setResultReady] = useState(false);
    const [resultModal, setResultModal] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);
    const [reload, setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [canType, setCanType] = useState(true);
    const [data, setData] = useState([
        { time: "00:00", cpm: 0, acc: 100, err: 0 },
    ]);
    const [resultData, setResultData] = useState([]);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    // 웹 500자
    // 모바일 120자
    const [texts, setTexts] = useState([
        {
            title: "나의 일기",
            author: "정윤석",
            uploader: "yundol",
            link: "https://github.com/seokkkkkk",
            text: "10ㅁㅁㅁㅁㅁㅁㅁㅁ20ㅁㅁㅁㅁㅁㅁㅁㅁ30ㅁㅁㅁㅁㅁㅁㅁㅁ40ㅁㅁㅁㅁㅁㅁㅁㅁ50ㅁㅁㅁㅁㅁㅁㅁㅁ60ㅁㅁㅁㅁㅁㅁㅁㅁ70ㅁㅁㅁㅁㅁㅁㅁㅁ80ㅁㅁㅁㅁㅁㅁㅁㅁ90ㅁㅁㅁㅁㅁㅁㅁㅁ100ㅁㅁㅁㅁㅁㅁㅁㅁ10ㅁㅁㅁㅁㅁㅁㅁㅁ20ㅁㅁㅁㅁㅁㅁㅁㅁ30ㅁㅁㅁㅁㅁㅁㅁㅁ40ㅁㅁㅁㅁㅁㅁㅁㅁ50ㅁㅁㅁㅁㅁㅁㅁㅁ60ㅁㅁㅁㅁㅁㅁㅁㅁ70ㅁㅁㅁㅁㅁㅁㅁㅁ80ㅁㅁㅁㅁㅁㅁㅁㅁ90ㅁㅁㅁㅁㅁㅁㅁㅁ200ㅁㅁㅁㅁㅁㅁㅁㅁ10ㅁㅁㅁㅁㅁㅁㅁㅁ20ㅁㅁㅁㅁㅁㅁㅁㅁ30ㅁㅁㅁㅁㅁㅁㅁㅁ40ㅁㅁㅁㅁㅁㅁㅁㅁ50ㅁㅁㅁㅁㅁㅁㅁㅁ60ㅁㅁㅁㅁㅁㅁㅁㅁ70ㅁㅁㅁㅁㅁㅁㅁㅁ80ㅁㅁㅁㅁㅁㅁㅁㅁ90ㅁㅁㅁㅁㅁㅁㅁㅁ300ㅁㅁㅁㅁㅁㅁㅁㅁ10ㅁㅁㅁㅁㅁㅁㅁㅁ20ㅁㅁㅁㅁㅁㅁㅁㅁ30ㅁㅁㅁㅁㅁㅁㅁㅁ40ㅁㅁㅁㅁㅁㅁㅁㅁ50ㅁㅁㅁㅁㅁㅁㅁㅁ60ㅁㅁㅁㅁㅁㅁㅁㅁ70ㅁㅁㅁㅁㅁㅁㅁㅁ80ㅁㅁㅁㅁㅁㅁㅁㅁ90ㅁㅁㅁㅁㅁㅁㅁㅁ400ㅁㅁㅁㅁㅁㅁㅁㅁ10ㅁㅁㅁㅁㅁㅁㅁㅁ20ㅁㅁㅁㅁㅁㅁㅁㅁ30ㅁㅁㅁㅁㅁㅁㅁㅁ40ㅁㅁㅁㅁㅁㅁㅁㅁ50ㅁㅁㅁㅁㅁㅁㅁㅁ60ㅁㅁㅁㅁㅁㅁㅁㅁ70ㅁㅁㅁㅁㅁㅁㅁㅁ80ㅁㅁㅁㅁㅁㅁㅁㅁ90ㅁㅁㅁㅁㅁㅁㅁㅁ500ㅁㅁㅁㅁㅁㅁㅁㅁ10ㅁㅁㅁㅁㅁㅁㅁㅁ20ㅁㅁㅁㅁㅁㅁㅁㅁ30ㅁㅁㅁㅁㅁㅁㅁㅁ40ㅁㅁㅁㅁㅁㅁㅁㅁ50ㅁㅁㅁㅁㅁㅁㅁㅁ60ㅁㅁㅁㅁㅁㅁㅁㅁ70ㅁㅁㅁㅁㅁㅁㅁㅁ80ㅁㅁㅁㅁㅁㅁㅁㅁ90ㅁㅁㅁㅁㅁㅁㅁㅁ600ㅁㅁㅁㅁㅁㅁㅁㅁ10ㅁㅁㅁㅁㅁㅁㅁㅁ20ㅁㅁㅁㅁㅁㅁㅁㅁ30ㅁㅁㅁㅁㅁㅁㅁㅁ40ㅁㅁㅁㅁㅁㅁㅁㅁ50ㅁㅁㅁㅁㅁㅁㅁㅁ60ㅁㅁㅁㅁㅁㅁㅁㅁ70ㅁㅁㅁㅁㅁㅁㅁㅁ80ㅁㅁㅁㅁㅁㅁㅁㅁ90ㅁㅁㅁㅁㅁㅁㅁㅁ700ㅁㅁㅁㅁㅁㅁㅁㅁ10ㅁㅁㅁㅁㅁㅁㅁㅁ20ㅁㅁㅁㅁㅁㅁㅁㅁ30ㅁㅁㅁㅁㅁㅁㅁㅁ40ㅁㅁㅁㅁㅁㅁㅁㅁ50ㅁㅁㅁㅁㅁㅁㅁㅁ60ㅁㅁㅁㅁㅁㅁㅁㅁ70ㅁㅁㅁㅁㅁㅁㅁㅁ80ㅁㅁㅁㅁㅁㅁㅁㅁ90ㅁㅁㅁㅁㅁㅁㅁㅁ800ㅁㅁㅁㅁㅁㅁㅁㅁ10ㅁㅁㅁㅁㅁㅁㅁㅁ20ㅁㅁㅁㅁㅁㅁㅁㅁ30ㅁㅁㅁㅁㅁㅁㅁㅁ40ㅁㅁㅁㅁㅁㅁㅁㅁ50ㅁㅁㅁㅁㅁㅁㅁㅁ60ㅁㅁㅁㅁㅁㅁㅁㅁ70ㅁㅁㅁㅁㅁㅁㅁㅁ80ㅁㅁㅁㅁㅁㅁㅁㅁ90ㅁㅁㅁㅁㅁㅁㅁㅁ900ㅁㅁㅁㅁㅁㅁㅁㅁ10ㅁㅁㅁㅁㅁㅁㅁㅁ20ㅁㅁㅁㅁㅁㅁㅁㅁ30ㅁㅁㅁㅁㅁㅁㅁㅁ40ㅁㅁㅁㅁㅁㅁㅁㅁ50ㅁㅁㅁㅁㅁㅁㅁㅁ60ㅁㅁㅁㅁㅁㅁㅁㅁ70ㅁㅁㅁㅁㅁㅁㅁㅁ80ㅁㅁㅁㅁㅁㅁㅁㅁ90ㅁㅁㅁㅁㅁㅁㅁㅁ1000ㅁㅁㅁㅁㅁㅁㅁㅁ10ㅁㅁㅁㅁㅁㅁㅁㅁ20ㅁㅁㅁㅁㅁㅁㅁㅁ30ㅁㅁㅁㅁㅁㅁㅁㅁ40ㅁㅁㅁㅁㅁㅁㅁㅁ50ㅁㅁㅁㅁㅁㅁㅁㅁ60ㅁㅁㅁㅁㅁㅁㅁㅁ70ㅁㅁㅁㅁㅁㅁㅁㅁ80ㅁㅁㅁㅁㅁㅁㅁㅁ90ㅁㅁㅁㅁㅁㅁㅁㅁ1100ㅁㅁㅁㅁㅁㅁㅁㅁ10ㅁㅁㅁㅁㅁㅁㅁㅁ20ㅁㅁㅁㅁㅁㅁㅁㅁ30ㅁㅁㅁㅁㅁㅁㅁㅁ40ㅁㅁㅁㅁㅁㅁㅁㅁ50ㅁㅁㅁㅁㅁㅁㅁㅁ60ㅁㅁㅁㅁㅁㅁㅁㅁ70ㅁㅁㅁㅁㅁㅁㅁㅁ80ㅁㅁㅁㅁㅁㅁㅁㅁ90ㅁㅁㅁㅁㅁㅁㅁㅁ1200ㅁㅁㅁㅁㅁㅁㅁㅁ10ㅁㅁㅁㅁㅁㅁㅁㅁ20ㅁㅁㅁㅁㅁㅁㅁㅁ30ㅁㅁㅁㅁㅁㅁㅁㅁ40ㅁㅁㅁㅁㅁㅁㅁㅁ50ㅁㅁㅁㅁㅁㅁㅁㅁ60ㅁㅁㅁㅁㅁㅁㅁㅁ70ㅁㅁㅁㅁㅁㅁㅁㅁ80ㅁㅁㅁㅁㅁㅁㅁㅁ90ㅁㅁㅁㅁㅁㅁㅁㅁ1300",
            id: 1,
        },
        {
            title: "나의 일기",
            author: "정지원",
            uploader: "yundol",
            link: "https://github.com/seokkkkkk",
            text: "ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ",
            id: 2,
        },
        {
            title: "나의 일기",
            author: "정윤석",
            uploader: "yundol",
            link: "https://github.com/seokkkkkk",
            text: "오늘은 날씨가 좋다.",
            id: 1,
        },
        {
            title: "나의 일기",
            author: "정윤석",
            uploader: "yundol",
            link: "https://github.com/seokkkkkk",
            text: "오늘은 날씨가 좋다.",
            id: 1,
        },
        {
            title: "나의 일기",
            author: "정희경",
            uploader: "yundol",
            link: "https://github.com/seokkkkkk",
            text: "오늘은 날씨가 덥다.",
            id: 3,
        },
        {
            title: "나의 일기",
            author: "정윤석",
            uploader: "yundol",
            link: "https://github.com/seokkkkkk",
            text: "오늘은 날씨가 좋다.",
            id: 1,
        },
        {
            title: "나의 일기",
            author: "정윤석",
            uploader: "yundol",
            link: "https://github.com/seokkkkkk",
            text: "오늘은 날씨가 좋다.",
            id: 1,
        },
    ]);
    const [currentText, setCurrentText] = useState(texts[0]);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [userData, setUserData] = useState({
        name: "yundol",
    });

    useEffect(() => {
        setCurrentText(texts[currentTextIndex]);
    }, [currentTextIndex, texts]);

    useEffect(() => {
        if (resultReady) {
            setCanType(false);
            setResult((prevResult) => [
                ...prevResult,
                cpm,
                acc,
                err,
                totalTime,
                currentText.id,
                currentText.title,
                currentText.author,
            ]);
            setResultData(data);
            handleReload();
            setResultReady(false);
        }
    }, [resultReady, cpm, acc, err, totalTime, result, data, currentText]);

    useEffect(() => {
        if (!resultReady && result.length > 5) {
            setResultModal(true);
        }
    }, [resultReady, result]);

    useEffect(() => {
        let likeIds = getCookie("likeIds") || [];
        setIsLike(likeIds.includes(currentText.id));
    }, [currentText.id, currentTextIndex]);

    function handleReload() {
        setIsLoading(true);
        setOpenAlert(false);
        setTimeout(() => setIsLoading(false), 500);
        setReloadKey((prevKey) => prevKey + 1);
        setCpm(0);
        setAcc(0);
        setErr(0);
        setData([{ time: "00:00", cpm: 0, acc: 100, err: 0 }]);
        setTotalTime(null);
        setReload(true);
    }

    function handleCloseResult() {
        setResultModal(false);
        setCanType(true);
        setResult([]);
        setData([{ time: "00:00", cpm: 0, acc: 100, err: 0 }]);
        if (texts.length > currentTextIndex + 1)
            setCurrentTextIndex(currentTextIndex + 1);
        else setOpenAlert(true);
    }

    function handleCurrentText({ indexDiff }) {
        if (typeof indexDiff !== "number") {
            console.error("indexDiff is not a number:", indexDiff);
            return;
        }

        setCurrentTextIndex((prevIndex) => {
            const newIndex = prevIndex + indexDiff;

            if (newIndex >= 0 && newIndex < texts.length) {
                handleReload();
                return newIndex;
            }
            return prevIndex;
        });
    }

    function handleTextSelect(index) {
        setCurrentTextIndex(index);
        setBottomMenuOpen(false);
    }

    function handleRightMenuOpen() {
        setRightMenuOpen(!rightMenuOpen);
    }

    function handleMenuClose() {
        if (rightMenuOpen) setRightMenuOpen(false);
        if (bottomMenuOpen) setBottomMenuOpen(false);
    }

    function handleLike() {
        let likeIds = getCookie("likeIds");
        if (likeIds) {
            if (!isLike) {
                let newLikeIds = [...likeIds, currentText.id];
                setCookie("likeIds", newLikeIds);
            } else {
                let filteredLikeIds = likeIds.filter(
                    (id) => id !== currentText.id
                );
                setCookie("likeIds", filteredLikeIds);
            }
        } else {
            setCookie("likeIds", [currentText.id]);
        }
        setIsLike(!isLike);
    }

    return (
        <MainPage>
            <MainLogo
                onClick={() => {
                    handleMenuClose();
                }}
            >
                <Logo />
                <MainHeader>Typist</MainHeader>
            </MainLogo>
            <MainBody
                onClick={() => {
                    handleMenuClose();
                }}
            >
                <MainMenuBar
                    acc={acc}
                    cpm={cpm}
                    currentTextIndex={currentTextIndex}
                    err={err}
                    handleCurrentText={handleCurrentText}
                    handleReload={handleReload}
                    handleMenuOpen={handleRightMenuOpen}
                    isLoading={isLoading}
                    texts={texts}
                    totalTime={totalTime}
                    isLike={isLike}
                    handleLike={handleLike}
                />
                {!isLoading && (
                    <TypingArea
                        canType={canType}
                        setCanType={setCanType}
                        key={reloadKey}
                        setAcc={setAcc}
                        setErr={setErr}
                        setCpm={setCpm}
                        totalTime={totalTime}
                        setTotalTime={setTotalTime}
                        reload={reload}
                        setReload={setReload}
                        setResultOpen={setResultReady}
                        setResult={setResult}
                        setData={setData}
                        text={currentText.text}
                    />
                )}
            </MainBody>
            <Footer>
                {!isLoading && (
                    <TextInfo
                        title={currentText.title}
                        link={currentText.link}
                        author={currentText.author}
                        uploader={currentText.uploader}
                    />
                )}
                <List onClick={() => setBottomMenuOpen(true)} />
            </Footer>
            <RightMenu
                userData={userData}
                isVisible={rightMenuOpen}
                setLoginModalOpen={setLoginModalOpen}
            />
            {resultModal && (
                <ResultModal
                    userData={userData}
                    data={resultData}
                    result={result}
                    handleLike={handleLike}
                    isLike={isLike}
                    handleCloseResult={handleCloseResult}
                    textInfo={currentText}
                />
            )}
            {
                <MainBottomMenu
                    texts={texts}
                    onSelectText={handleTextSelect}
                    currentTextIndex={currentTextIndex}
                    isVisible={bottomMenuOpen}
                />
            }
            {openAlert && <EndOfText setOpenAlert={setOpenAlert} />}
            {loginModalOpen && (
                <LoginModal setLoginModalOpen={setLoginModalOpen} />
            )}
        </MainPage>
    );
}
