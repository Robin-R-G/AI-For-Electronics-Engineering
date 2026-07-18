// Dedicated layout for the presenter route.
// Intentionally overrides the root layout — no global navbar, PCB background, or QR button.
export default function PresenterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ margin: 0, padding: 0, background: '#060810', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
