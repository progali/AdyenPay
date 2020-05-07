require('./bootstrap');
const configuration = {
    paymentMethodsResponse: paymentMethodsResponse // The `/paymentMethods` response from the server.
    originKey: "YOUR_ORIGIN_KEY",
    locale: "en-US",
    environment: "test",
    onSubmit: (state, dropin) => {
        // Your function calling your server to make the `/payments` request
        makePayment(state.data)
          .then(response => {
            if (response.action) {
              // Drop-in handles the action object from the /payments response
              dropin.handleAction(response.action);
            } else {
              // Your function to show the final result to the shopper
              showFinalResult(response);
            }
          })
          .catch(error => {
            throw Error(error);
          });
      },
    onAdditionalDetails: (state, dropin) => {
      // Your function calling your server to make a `/payments/details` request
      makeDetailsCall(state.data)
        .then(response => {
          if (response.action) {
            // Drop-in handles the action object from the /payments response
            dropin.handleAction(response.action);
          } else {
            // Your function to show the final result to the shopper
            showFinalResult(response);
          }
        })
        .catch(error => {
          throw Error(error);
        });
    },
    paymentMethodsConfiguration: {
      card: { // Example optional configuration for Cards
        hasHolderName: true,
        holderNameRequired: true,
        enableStoreDetails: true,
        hideCVC: false, // Change this to true to hide the CVC field for stored cards
        name: 'Credit or debit card'
      }
    }
   };