# Productization Checklist

> **Purpose:** Post-build validation — is the forged platform ready for production?
> **Used by:** @qa (Phase 7 of wf-forge)
> **Source:** BV_DX_004 (Productization Checklist) from bret-victor.md
> **Inspiration:** "These people are together in the same physical space, but they're each in their own isolated little world."
> [SOURCE: https://dynamicland.org/2024/Computational_Public_Space/]

## 7 Mandatory Production Checks

Every forged platform MUST include all 7 layers:

### 1. Auth Boundary
- [ ] Authentication system implemented (login/signup)
- [ ] Authorization rules defined (who can access what)
- [ ] Session management configured
- [ ] Protected routes enforced
- [ ] Guest/anonymous access policy defined

### 2. API Layer
- [ ] API routes defined for all agent interactions
- [ ] Request validation implemented (Zod schemas)
- [ ] Response formatting consistent
- [ ] Rate limiting configured
- [ ] Error responses follow standard format

### 3. Config Layer
- [ ] Platform settings are configurable (not hardcoded)
- [ ] Environment variables documented
- [ ] Feature flags available for toggling capabilities
- [ ] Agent selection/activation is configurable

### 4. Theme Layer
- [ ] Design tokens applied consistently
- [ ] Light/Dark/System theme modes work
- [ ] Brand colors propagate through all components
- [ ] Typography system consistent across pages
- [ ] Custom themes can be applied via tokens

### 5. Analytics Layer
- [ ] Page views tracked
- [ ] User interactions tracked (clicks, submissions)
- [ ] Agent usage metrics collected
- [ ] Error events logged
- [ ] Performance metrics (Core Web Vitals) monitored

### 6. Error Handling
- [ ] Global error boundary implemented
- [ ] API errors display user-friendly messages
- [ ] Network failures handled gracefully (offline state)
- [ ] Form validation errors shown inline
- [ ] 404/500 pages designed and functional

### 7. Responsive Design
- [ ] Mobile layout works (320px-768px)
- [ ] Tablet layout works (768px-1024px)
- [ ] Desktop layout works (1024px+)
- [ ] Touch interactions supported on mobile
- [ ] No horizontal scroll on any viewport

## Scoring

| Score | Verdict | Action |
|-------|---------|--------|
| 7/7 | **PASS** | Ready for deployment (Phase 8) |
| 5-6/7 | **CONCERNS** | Document missing layers, proceed with caution |
| 3-4/7 | **FAIL** | Return to @dev for fixes |
| 0-2/7 | **CRITICAL FAIL** | Escalate — fundamental issues |

## Output

```yaml
productization:
  verdict: "PASS" | "CONCERNS" | "FAIL" | "CRITICAL_FAIL"
  score: "N/7"
  checks:
    auth: { status: "pass|fail", notes: "" }
    api: { status: "pass|fail", notes: "" }
    config: { status: "pass|fail", notes: "" }
    theme: { status: "pass|fail", notes: "" }
    analytics: { status: "pass|fail", notes: "" }
    error_handling: { status: "pass|fail", notes: "" }
    responsive: { status: "pass|fail", notes: "" }
  missing_layers: []
  recommendations: []
```
