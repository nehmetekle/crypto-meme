// Function to shorten the address
function shortenAddress(address) {
  const firstFive = address.slice(0, 5);
  const lastFour = address.slice(-4);
  return `${firstFive}...${lastFour}`;
}

// Function to copy the real address to the clipboard and display the message
function copyAddress(addressId) {
  const addressElement = document.getElementById(addressId);

  // Get the real address from the data-address attribute
  const realAddress = addressElement.getAttribute("data-address");

  // Create a temporary input element to copy the address text
  const tempInput = document.createElement("input");
  document.body.appendChild(tempInput);
  tempInput.value = realAddress; // Copy the real address
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  // Show the "Copied to clipboard!" message
  const copyStatus = document.getElementById(
    `copy-status${addressId.charAt(addressId.length - 1)}`
  );
  copyStatus.style.display = "block";

  setTimeout(() => {
    copyStatus.style.display = "none";
  }, 5000);
}

// Select all address elements
const addressElements = document.querySelectorAll(".address");

// Loop through each address and update its content
addressElements.forEach((addressElement) => {
  const originalAddress = addressElement.getAttribute("data-address"); // Get the real address
  const shortenedAddress = shortenAddress(originalAddress);

  // Update the content with the shortened address and the copy icon
  addressElement.innerHTML = `${shortenedAddress} <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="#e81f2f" class="copy-icon" onclick="copyAddress('${addressElement.id}')">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
    </svg>`;
});

// Define the token address as a constant
const tokenAddress = "Df6yfrKC8kZE3KNkrHERKzAetSxbrWeniQfyJY4Jpump";

function formatNumber(number) {
  return number ? new Intl.NumberFormat().format(number) : "N/A";
}

function shortenAddress(address) {
  const firstFive = address.slice(0, 5);
  const lastFour = address.slice(-4);
  return `${firstFive}...${lastFour}`;
}

function copyAddress(addressId) {
  const addressElement = document.getElementById(addressId);

  const realAddress = addressElement.getAttribute("data-address");

  const tempInput = document.createElement("input");
  document.body.appendChild(tempInput);
  tempInput.value = realAddress;
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  const copyStatus = document.getElementById(
    `copy-status${addressId.charAt(addressId.length - 1)}`
  );
  copyStatus.style.display = "block";

  setTimeout(() => {
    copyStatus.style.display = "none";
  }, 5000);
}

// Fetch token information from the Dexscreener API and update the UI
async function fetchTokenInfo() {
  const url = `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`;

  try {
    // Fetch data from the API
    const response = await fetch(url);
    const data = await response.json();

    console.log("API Response:", data);

    // Safely access the first pair object
    const tokenPair = data?.pairs?.[0];
    if (!tokenPair) {
      throw new Error("Token data not found");
    }

    // Extract required data
    const tokenName = tokenPair.baseToken.name || "N/A";
    const fullTokenAddress = tokenPair.baseToken.address || "N/A";
    const shortenedAddress = shortenAddress(fullTokenAddress);
    const priceUsd = tokenPair.priceUsd || "0";
    const marketCap = tokenPair.marketCap || "0";
    const liquidity = tokenPair.liquidity?.usd || "0";
    const volume24h = tokenPair.volume?.h24 || "0";

    // Update the title
    document.querySelector(".title").innerText = `$${tokenName}`;

    // Update the buy button text with the token name
    const buyButton = document.getElementById("buyButton");
    buyButton.innerText = `Buy $${tokenName}`;

    // Update the token address content with copy functionality
    const addressElement = document.getElementById("address1");
    addressElement.setAttribute("data-address", fullTokenAddress);
    addressElement.innerHTML = `
      ${shortenedAddress} 
      <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="#e81f2f" class="copy-icon" onclick="copyAddress('address1')">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
      </svg>
    `;

    // Update the remaining fields
    document.getElementById("price").innerText = `$${parseFloat(
      priceUsd
    ).toFixed(7)}`;
    document.getElementById("market-cap").innerText = `$${formatNumber(
      parseFloat(marketCap)
    )}`;
    document.getElementById("liquidity").innerText = `$${formatNumber(
      parseFloat(liquidity)
    )}`;
    document.getElementById("volume").innerText = `$${formatNumber(
      parseFloat(volume24h)
    )}`;

    console.log("Data displayed successfully!");
  } catch (error) {
    console.error("Error fetching or displaying token info:", error);

    // Set fallback values in case of an error
    document.querySelector(".title").innerText = "Data Unavailable";
    document.getElementById("address1").innerText = "Address Unavailable";
    document.getElementById("price").innerText = "N/A";
    document.getElementById("market-cap").innerText = "N/A";
    document.getElementById("liquidity").innerText = "N/A";
    document.getElementById("volume").innerText = "N/A";
  }
}
fetchTokenInfo();

function buyToken() {
  window.open(
    `https://phantom.com/tokens/solana/${tokenAddress}?referralId=84bpu4aqe76`,
    "_blank"
  );
}

function dexScreener() {
  window.open(
    "https://dexscreener.com/solana/cunzmcz3xjx9tqvavdyckknixnuefiqkthuxbcrxzcyu",
    "_blank"
  );
}
