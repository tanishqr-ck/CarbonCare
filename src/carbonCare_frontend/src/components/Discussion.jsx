import React, { useEffect } from 'react';

const DisqusComments = () => {
  useEffect(() => {
    // This function configures Disqus. Uncomment and edit as needed.
    /*
    var disqus_config = function () {
      this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    */

    // Dynamically create a script element for Disqus embed script
    const script = document.createElement('script');
    script.src = 'https://test-dsostld62n.disqus.com/embed.js';
    script.setAttribute('data-timestamp', +new Date());
    document.body.appendChild(script);

    // Dynamically create a script element for Disqus comment count script
    const countScript = document.createElement('script');
    countScript.src = '//test-dsostld62n.disqus.com/count.js';
    countScript.async = true;
    document.body.appendChild(countScript);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(countScript);
    };
  }, []);

  return (
    <div id="disqus_thread"></div>
  );
};

export default DisqusComments;
