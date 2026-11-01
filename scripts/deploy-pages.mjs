// Builds the site for GitHub Pages (https://ledgerly111.github.io/4thepeople/) and
// force-pushes dist/ to the gh-pages branch of origin.
import { execSync } from 'node:child_process'
import { copyFileSync, mkdtempSync, rmSync, writeFileSync, cpSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const run = (cmd, opts = {}) => execSync(cmd, { stdio: 'inherit', ...opts })
const origin = execSync('git remote get-url origin').toString().trim()
const commit = execSync('git rev-parse --short HEAD').toString().trim()

run('npx vite build', { env: { ...process.env, SITE_BASE: '/4thepeople/' } })
// Deep links (/4thepeople/retail) have no file of their own: GitHub Pages serves 404.html,
// which is the app, and the router takes it from there.
copyFileSync('dist/index.html', 'dist/404.html')
writeFileSync('dist/.nojekyll', '')

const dir = mkdtempSync(join(tmpdir(), '4tp-pages-'))
try {
  cpSync('dist', dir, { recursive: true })
  const git = (cmd) => run(`git ${cmd}`, { cwd: dir })
  git('init -q -b gh-pages')
  git('add -A')
  git(`commit -q -m "Deploy ${commit}"`)
  git(`push -f ${origin} gh-pages`)
} finally {
  rmSync(dir, { recursive: true, force: true })
}
console.log('\nDeployed to https://ledgerly111.github.io/4thepeople/')
