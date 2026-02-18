#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function findProjectRoot() {
  // npm sets INIT_CWD to the directory where `npm install` was run
  return path.resolve(process.env.INIT_CWD || process.cwd());
}

function isOwnRepo(projectRoot) {
  // Avoid running postinstall when developing this package itself
  const packageRoot = path.resolve(__dirname, '..', '..', '..');
  return projectRoot === packageRoot;
}

function createDesignSystemsFolder(projectRoot) {
  const dsFolder = path.join(projectRoot, 'design-systems');

  if (!fs.existsSync(dsFolder)) {
    fs.mkdirSync(dsFolder, { recursive: true });
    console.log('  ✅ design-systems/ criado');
  } else {
    console.log('  ✓  design-systems/ já existe');
  }

  const manifestPath = path.join(dsFolder, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    fs.writeFileSync(manifestPath, JSON.stringify({
      version: '1.0.0',
      installed: [],
      active: null
    }, null, 2) + '\n');
    console.log('  ✅ design-systems/manifest.json criado');
  }
}

function updateGitignore(projectRoot) {
  const gitignorePath = path.join(projectRoot, '.gitignore');
  const marker = 'design-systems/';
  const block = [
    '',
    '# Design Systems (local only — cada dev instala localmente)',
    'design-systems/',
    '',
  ].join('\n');

  if (!fs.existsSync(gitignorePath)) {
    fs.writeFileSync(gitignorePath, block.trimStart());
    console.log('  ✅ .gitignore criado com design-systems/');
    return;
  }

  const content = fs.readFileSync(gitignorePath, 'utf8');
  if (content.includes(marker)) {
    console.log('  ✓  design-systems/ já está no .gitignore');
    return;
  }

  fs.appendFileSync(gitignorePath, block);
  console.log('  ✅ design-systems/ adicionado ao .gitignore');
}

function installSkills(projectRoot) {
  const claudeDir = path.join(projectRoot, '.claude');
  const skillsSrc = path.join(__dirname, '..', 'skills');

  if (!fs.existsSync(skillsSrc)) return;

  if (!fs.existsSync(claudeDir)) {
    console.log('  ⚠️  .claude/ não encontrado — skills não instaladas.');
    console.log('     (Este projeto não parece usar Claude Code.)');
    return;
  }

  const skillsDest = path.join(claudeDir, 'commands');
  fs.mkdirSync(skillsDest, { recursive: true });

  const files = fs.readdirSync(skillsSrc).filter(f => f.endsWith('.md'));
  for (const file of files) {
    fs.copyFileSync(path.join(skillsSrc, file), path.join(skillsDest, file));
  }

  console.log(`  ✅ ${files.length} skill(s) instalada(s) em .claude/commands/`);
}

function main() {
  const projectRoot = findProjectRoot();

  if (isOwnRepo(projectRoot)) return;

  console.log('\n🎨 @eximia-ventures/ds — Setup\n');

  try {
    createDesignSystemsFolder(projectRoot);
    updateGitignore(projectRoot);
    installSkills(projectRoot);
  } catch (err) {
    console.error('\n  ❌ Erro durante setup:', err.message);
    console.error('     Setup pode estar incompleto. Execute manualmente:');
    console.error('     mkdir design-systems && echo "design-systems/" >> .gitignore\n');
    process.exit(1);
  }

  console.log('\n  Pronto! Skills disponíveis no Claude Code:');
  console.log('  /ds-pack    → empacotar um design system');
  console.log('  /ds-install → instalar um .dspack');
  console.log('  /ds-list    → listar DSs instalados');
  console.log('  /ds-apply   → aplicar DS no projeto\n');
}

main();
