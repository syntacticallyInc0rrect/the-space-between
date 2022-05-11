
# The Space Between v0.0.1

## About the project
>
>The Space Between provides a useTheSpaceBetween() hook to wrap your server requests in a configurable AxiosInstance
>or preconfigured fetch functions that resolve the response to valid JSON objects.
>
>The **primary** benefit to utilizing the useTheSpaceBetween() hook is the countdown timer that is initiated upon the
>initial render, and restarted every time a server response is received when the server calls are being made through
>the httpClient that is provided from the useTheSpaceBetween() hook.
>
>The useTheSpaceBetween hook can also accept a function to be executed between a server response and receiving the
>response; as well as a function to be executed between a server error and receiving the error.
>
>A **<**SessionModal**>** component is also available to be used hand in hand with the useTheSpaceBetween() hook's timer
>in order to alert the user of an imminent session expiration or an already expired session.
>
>The hook and component work hand in hand on coupling server responses to an approximate timer of a valid server session
>before it expires.

## Setup
>### install (not real yet; need to publish package when release is ready)
>```
>yarn add the-space-between
>```
>or
>```
>npm install the-space-between --save
>```

## Import
>### import axios or fetch version of the useTheSpaceBetween() hook
>```
>import {useTheSpaceBetween} from "./src/axios";
>```
>or
>```
>import {useTheSpaceBetween} from "./src/fetch";
>```
>### import *<*SessionModal*>* (or use your own component)
>```
>import {SessionModal} from "./src/components";
>```

## Utilize
>### Instantiate useTheSpaceBetween() hook
>```
>const [sessionTimeRemaining, shouldWarn, isExpired, httpClient] = useTheSpaceBetween(
>    60 * 15,
>    60,
>    {headers: {Accept: 'application/json'}}
>);
>```
>### Utilize the httpClient for all requests to the server
>```
>useEffect(() => {
>    httpClient.get('/books').then(r => setBooks(r.data));
>    // eslint-disable-next-line react-hooks/exhaustive-deps
>}, []);
>```
>### Utilize the *<*SessionModal*>* and values from the useTheSpaceBetween() hook to conditionally render the warning dialogue to the user
>```
><div className="App">
>    <header className="App-header">
>        <Header view={view}/>
>    </header>
>    <main className="App-body">
>        {shouldWarn && (
>            <SessionModal isExpired={isExpired}
>                          renewSessionFn={() => httpClient.get('/books').then(r => setBooks(r.data))}
>            >
>                {isExpired ?
>                    <p>Your session has expired.</p> :
>                    <p>Your session will expire in {sessionTimeRemaining} seconds or less.</p>}
>            </SessionModal>
>        )}
>        <Body
>            view={view}
>            setView={setView}
>            books={books}
>            addNewBook={addNewBook}
>            deleteBook={deleteBook}
>        />
>    </main>
></div>
>```
>>###optional:
>>>you can use your own component to alert the user but it is highly encouraged to utilize the same properties as shown
>>>above to ensure a good user experience.

## NPM Dependencies
>* @types/react
>* axios
>* react
>* react-icons
>* typescript
>