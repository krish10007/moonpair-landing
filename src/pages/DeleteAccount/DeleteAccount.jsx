import './DeleteAccount.css';

// Publicly reachable account-deletion page. Google Play requires this URL to be
// accessible WITHOUT logging in - it goes in the Play Console "Delete account
// URL" field, and a reviewer will open it cold. vercel.json's SPA catch-all
// rewrite is what makes /delete-account resolve on a direct hit.
export default function DeleteAccount() {
  return (
    <section className="da">
      <div className="container da-content">
        <span className="section-eyebrow">✦ Account &amp; Data ✦</span>

        <h1 className="da-title">
          Delete Your <span className="da-title-accent">Account</span>
        </h1>

        <p className="da-subtext">
          Deleting your Moonpair account is easy and can be done directly from the app.
        </p>

        <div className="da-body">
          <div className="da-block">
            <h2 className="da-heading">How to delete your account</h2>
            <ol className="da-steps">
              <li>
                Open Moonpair and go to <strong>Settings</strong>
              </li>
              <li>
                Tap <strong>Delete Account</strong>
              </li>
              <li>Confirm the deletion</li>
            </ol>
            <p className="da-note">
              Your account will be permanently deleted within 30 days.
            </p>
          </div>

          <div className="da-block">
            <h2 className="da-heading">What gets deleted</h2>
            <p>
              Your profile, memories, photos, voice notes, Secret Book answers, notes jar
              entries, and stardust balance will be permanently removed.
            </p>
          </div>

          <div className="da-callout">
            <h2 className="da-heading">A note for couples</h2>
            <p>
              Since Moonpair is a shared experience, deleting your account also removes your
              partner&apos;s access to the memories and content you created together. We
              recommend letting them know before you delete your account.
            </p>
          </div>

          <div className="da-block">
            <h2 className="da-heading">Can&apos;t access the app?</h2>
            <p>
              If you&apos;re unable to log in or use the in-app delete option, email us at{' '}
              <a
                className="da-link"
                href="mailto:support@moonpairapp.com?subject=Delete%20My%20Account"
              >
                support@moonpairapp.com
              </a>{' '}
              with the subject <strong>&ldquo;Delete My Account&rdquo;</strong> and your
              registered email address, and we&apos;ll process the request manually.
            </p>
          </div>

          <div className="da-block">
            <h2 className="da-heading">Data retention</h2>
            <p>
              Some information may be retained for a limited period where required by law
              (for example, billing and transaction records for tax purposes).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
