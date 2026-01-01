## Prerequisites

- Node.js v18+
- npm
- An Applitools account with **Execution Cloud enabled**
- Applitools API key

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/ssharma007-dev/Execution_Cloud_WDIO.git
cd Execution_Cloud_WDIO
```
### 2. Install dependency
npm install

### 3. Set environment variables
```
export APPLITOOLS_API_KEY=<your_api_key>
export APPLITOOLS_SERVER_URL=https://eyes.applitools.com
```

### 4. Run the test
npx wdio run wdio.conf.js
