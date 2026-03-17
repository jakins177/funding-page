export default function LoanPage({ params }: { params: { state: string; dealType: string } }) {
  const state = params.state;
  const dealType = params.dealType;
  
  const title = `${dealType} in ${state} | Funding Connect`;
  const heroTitle = `Fast ${dealType} Capital for Real Estate Investors in ${state}`;
  const subtitle = `We connect serious investors with hard money, private money, and conventional lenders. Get funded for your next flip, BRRRR, or rental project.`;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f4efe7', color: '#1d1a16', minHeight: '100vh', margin: 0, padding: 0 }}>
      <header style={{ background: 'linear-gradient(135deg, #b67b3b, #7a4d1f)', color: 'white', padding: '60px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent)', zIndex: 1 }}></div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px', marginBottom: '10px', fontWeight: '600' }}>Funding Connect</p>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', margin: '0 0 20px 0', fontWeight: '700', lineHeight: 1.2 }}>{heroTitle}</h1>
          <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '600px', margin: '0 auto 30px auto', lineHeight: 1.6 }}>{subtitle}</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px' }}>Same-day matching</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px' }}>Nationwide network</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px' }}>No obligation</span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '15px', color: '#1d1a16' }}>Get Funded for Your {state} Deal</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '20px', color: '#645b52' }}>
            Whether you are looking for {dealType} financing in {state}, our network of private and hard money lenders can help you close faster. 
            Our AI-powered agent will analyze your deal and match you with the right lender.
          </p>
          
          <div style={{ marginTop: '30px' }}>
             <iframe 
                src="https://agentbuilder.palmtreesai.com/embed/a830e00b-bf36-4df9-b66b-cbd69d2491ea" 
                width="100%" 
                height="600px" 
                style={{ border: '1px solid #e5e7eb', borderRadius: '12px', minHeight: '500px' }}
                title="Funding Connect AI Agent"
             ></iframe>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '40px' }}>
          <div style={{ padding: '20px', background: '#fffdf8', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#b67b3b' }}>Speed</h3>
            <p style={{ fontSize: '14px', color: '#645b52', lineHeight: 1.5 }}>We prioritize fast closings so you don't lose your deal.</p>
          </div>
          <div style={{ padding: '20px', background: '#fffdf8', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#b67b3b' }}>Network</h3>
            <p style={{ fontSize: '14px', color: '#645b52', lineHeight: 1.5 }}>Access our exclusive Double Edge lender network.</p>
          </div>
          <div style={{ padding: '20px', background: '#fffdf8', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#b67b3b' }}>Trust</h3>
            <p style={{ fontSize: '14px', color: '#645b52', lineHeight: 1.5 }}>Verified hard money and private lenders you can rely on.</p>
          </div>
        </div>
      </main>

      <footer style={{ background: '#1d1a16', color: '#645b52', padding: '40px 20px', textAlign: 'center', marginTop: '60px' }}>
        <p style={{ fontSize: '14px' }}>© 2026 Funding Connect — We are not a direct lender. We match borrowers with private lenders.</p>
      </footer>
    </div>
  );
}
