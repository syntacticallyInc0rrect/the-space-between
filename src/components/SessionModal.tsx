import React, {ReactElement} from 'react';
import {MdOutlineErrorOutline} from "react-icons/md";
import {ImWarning} from "react-icons/im";
import {CgRedo} from "react-icons/cg";
import {BiRefresh} from "react-icons/bi";

/**SessionModalProps allow the SessionModal to dynamically style the alert to the user
 * > isExpired: boolean returned from useTheSpaceBetween hook.
 *
 * > renewSessionFn: must be a server request utilizing the httpClient returned from the useTheSpaceBetween hook.
 *
 * */
type SessionModalProps = {
    isExpired: boolean;
    renewSessionFn: () => void;
    children: ReactElement;
};

/**SessionModal is meant to be paired with the useTheSpaceBetween hook.
* > isExpired: boolean returned from useTheSpaceBetween hook.
 *
* > renewSessionFn: must be a server request utilizing the httpClient returned from the useTheSpaceBetween hook.
 *
* > children: should be a dynamic typography element to alert the user of an imminent session timeout or a current session timeout.
*
 * example children:
 *
* {isExpired ?
 *
* > <<p>>Your session has expired.<</p>> :
 *
* > <<p>>Session expiring in {sessionTimeRemaining}.<</p>>}
* */
export const SessionModal = ({isExpired, renewSessionFn, children}: SessionModalProps): ReactElement => (
    <div className={isExpired ? "Modal" : ""}>
        <div className="Modal-snackbar-container">
            <div
                className={!isExpired ? "Modal-snackbar-expiring" : "Modal-snackbar-expired"}>
                <div className="Modal-snackbar-icon-container">
                    {!isExpired ?
                        <ImWarning className="Modal-snackbar-icon"/> :
                        <MdOutlineErrorOutline className="Modal-snackbar-icon"/>}
                </div>
                <div className="Modal-snackbar-text">
                    {children}
                </div>
                <div className="Modal-snackbar-action-container">
                    {!isExpired ? (
                        <button className="Modal-snackbar-action" onClick={renewSessionFn}>
                            <BiRefresh/>
                        </button>
                    ) : (
                        <button className="Modal-snackbar-action" onClick={() => {
                            window.location.reload();
                        }}>
                            <CgRedo/>
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
);
