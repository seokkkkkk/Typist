import {
    NotificationContainer,
    NotificationIcon,
    NotificationNumber,
} from "./RightMenu.styled";

export function NotificationBell({ number }) {
    var printNumber = number;
    if (printNumber > 99) printNumber = "99";
    return (
        <NotificationContainer>
            <NotificationIcon />
            {number > 0 && (
                <NotificationNumber>{printNumber}</NotificationNumber>
            )}
        </NotificationContainer>
    );
}
