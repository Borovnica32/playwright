# Basic Setup & Execution

## 1. Install Robot Framework
```cmd
pip install robotframework
```

## 2. Run Tests
```cmd
robot tests/
```

## 3. Run a Single File
```cmd
robot test.robot
```

## 4. Run Specific Test
```cmd
robot -t "Test Name" test.robot
```

## 5. Run with Tags
```cmd
robot -i smoke tests/
```

# Basic Test Structure
```robot
*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}     https://example.com
${BROWSER} chrome

*** Keywords ***
Login User
    Input Text    id:username    admin
    Input Text    id:password    1234
    Click Button  id:login

*** Test Cases ***
Open Website
    Open Browser    ${URL}    ${BROWSER}
    Title Should Be    Example Domain
    Close Browser
```

## Variables
### 1. Scalar Variables
```robot
*** Variables ***
${NAME}    John
${AGE}     25
```

### 2. List Variables
```robot
*** Variables ***
@{FRUITS}    apple    banana    orange
```

### 3. Dictionary Variables
```robot
*** Variables ***
&{USER}    name=John    age=25
```

## Keywords
Think of them as functions
### 1. User-Defined Keyword
```robot
*** Keywords ***
Login User
    Input Text    id:username    admin
    Input Text    id:password    1234
    Click Button  id:login
```

### 2. Using Keyword in Test
```robot
*** Variables ***
${title}    Get Title

*** Test Cases ***
Valid Login
    Login User
    Should contain  ${title}
```

## Locators (SeleniumLibrary)
### 1. By ID
```robot
*** Keywords ***
Login User
    Input Text    id:username    admin
    Input Text    id:password    1234

    Click Button  id:login
```
### 2. By Class
```robot
*** Keywords ***
Login User
    Input Text      id:username    admin
    Input Text      id:password    1234

    Click Element   css:.btn-primary
```

### 3. By XPath
```robot
*** Keywords *** 
log in user
    Input Text        id:upime     admin
    Input Password    id:passwd    1234s

    Click Element     xpath://button[contains(text(), "Log in")]
```
### 4. By Name
```robot
*** Keywords *** 
log in user
    Input Text    name:username    admin
    Input Text    name:password    1234

    Click Element     xpath://button[contains(text(), "Log in")]
```

### 5. By Text
```robot
*** Keywords *** 
log in user
    Input Text    name:username    admin
    Input Text    name:password    1234

    Click Element    link:Log in
```


## UI Actions
### 1. Open / Close Browser
```robot
*** Test Cases ***
Open website
    Open Browser    https://example.com    chrome
    Close Browser
```

### 2. Click Element
```robot
*** Test Cases ***
Open website
    Open Browser    https://example.com    chrome

    Click Element    id:submit

    Close Browser
```

### 3. Input Text
```robot
*** Keywords *** 
Input username
    Input Text    id:username    admin
```

### 4. Clear Field
```robot
*** Keywords *** 
Input username
    Clear Element Text    id:username
```

### 5. Select Dropdown
```robot
*** Keywords *** 
Select from dropdown
    Select From List By Value    id:country    US
```

### 6. Checkbox
```robot
*** Keywords *** 
Check/uncheck checkbox
    Select Checkbox    id:agree
    Unselect Checkbox    id:agree
```

### 7. Waits
```robot
*** Keywords *** 
Wait
    Wait Until Element Is Visible    id:submit    10s
    Sleep    2s
    # Use "wait for list of waits"
```

## Assertions (Validations)
### 1. Title Check
```robot
*** Keywords *** 
Check title
    Title Should Be    Example Domain
```

### 2. Text Should Be Present
```robot
*** Keywords *** 
Check for preset text
    Page Should Contain    Welcome
```

### 3. Element Should Be Visible
```robot
*** Keywords *** 
check if element is visible
    Element Should Be Visible    id:submit
```

### 4. Element Text Should Be
```robot
*** Keywords *** 
Check if element contains defined text
    Element Text Should Be    id:title    Hello
```

# Loops & Conditions
## 1. FOR Loop
```robot
*** Keywords *** 
for loop
    FOR    ${item}    IN    apple    banana    orange
        Log    ${item}
    END
```

## 2. FOR Range
```robot
*** Keywords *** 
for range
    FOR    ${i}    IN RANGE    5
        Log    ${i}
    END
```

## 3. IF Condition
```robot
*** Keywords ***
if condition
    IF    '${BROWSER}' == 'chrome'
        Log    Using Chrome
    END
```

---

# API Testing (RequestsLibrary)
## 1. Install Library
```cmd
pip install robotframework-requests
```

## 2. GET Request
```robot
*** Settings ***
Library    RequestsLibrary

*** Test Cases ***
Get Users
    ${response}=    GET    https://api.example.com/users
    Should Be Equal As Integers    ${response.status_code}    200
```
## 3. POST Request
```robot
*** Settings ***
Library    RequestsLibrary

*** Test Cases ***
Post Users
    ${body}=    Create Dictionary    name=John    job=QA

    ${response}=    POST    https://api.example.com/users    json=${body}
```

## 4. Validate Response
```robot
*** Test Cases ***
Validate response
    Should Contain    ${response.text}    John
```

## 5. JSON Parsing
```robot
*** Test Cases ***
JSON parse
    ${json}=    Set Variable    ${response.json()}
    Log    ${json}[name]
```

---

# Advanced (Test Flow Control)
## 1. Run Keyword If
```robot
*** Test Cases ***
Keyword if
    Run Keyword If    ${status} == 'PASS'    Log    Success
```

## 2. Try / Except (Error Handling)
```robot
*** Test Cases ***
Try/Except
    Run Keyword And Ignore Error    Click Element    id:missing
```

---

# Debugging
## 1. Log Values
```robot
*** Test Cases ***
debugging
    Log    This is a debug message
    Log    ${variable}
```
## 2. Pause Execution
```robot
*** Test Cases ***
pausing
    Pause Execution
```

## 3. Run with Debug Logs
```cmd
robot --loglevel DEBUG test.robot
```

---

# Tags
## 1. Add Tags
```robot
*** Test Cases ***
Login Test
    [Tags]    smoke    regression
    Open Browser    https://example.com    chrome
```
## 2. Run Tags
```cmd
robot -i smoke tests/
robot -e regression tests/
```

---

# Parallel Execution
```cmd
pabot --processes 4 tests/
```

---

# UI + API Combo (Advanced Pattern)
```robot
*** Test Cases ***
UI And API Validation
    ${response}=    GET    https://api.example.com/users
    ${json}=    Set Variable    ${response.json()}

    Open Browser    https://example.com    chrome
    Page Should Contain    ${json}[0]['name']
    Close Browser
```