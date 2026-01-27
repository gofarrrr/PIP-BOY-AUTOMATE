#!/usr/bin/env npx ts-node
/**
 * Knowledge Chart CLI
 * 
 * Commands:
 *   nodes          List all nodes with their IDs and types
 *   node <id>      Show full details for a specific node
 *   drawer <id>    Show what drawer sections would render for a node
 *   validate       Check for data integrity issues
 *   insights       List all tactical insights and their triggers
 */

import { KNOWLEDGE_NODES, KNOWLEDGE_EDGES, KNOWLEDGE_NODE_LABELS, KNOWLEDGE_TACTICAL_INSIGHTS } from '../constants-knowledge';

const args = process.argv.slice(2);
const command = args[0];
const param = args[1];

// Color helpers for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    red: '\x1b[31m',
    magenta: '\x1b[35m',
};

function printHeader(text: string) {
    console.log(`\n${colors.bright}${colors.cyan}═══ ${text} ═══${colors.reset}\n`);
}

function printSubHeader(text: string) {
    console.log(`${colors.yellow}▸ ${text}${colors.reset}`);
}

// Command: nodes - List all nodes
function listNodes() {
    printHeader('KNOWLEDGE NODES');

    const decisions = KNOWLEDGE_NODES.filter(n => n.type === 'decision');
    const outcomes = KNOWLEDGE_NODES.filter(n => n.type === 'outcome');

    printSubHeader('Decision Nodes (blue diamonds):');
    decisions.forEach(n => {
        const label = KNOWLEDGE_NODE_LABELS[n.id] || n.label.replace(/\\n/g, ' ');
        console.log(`  ${colors.blue}◆${colors.reset} ${n.id.padEnd(20)} → ${label}`);
    });

    console.log('');
    printSubHeader('Outcome Nodes (colored boxes):');
    outcomes.forEach(n => {
        const label = KNOWLEDGE_NODE_LABELS[n.id] || n.label.replace(/\\n/g, ' ');
        const colorCode = n.color === 'green' ? colors.green : colors.yellow;
        console.log(`  ${colorCode}■${colors.reset} ${n.id.padEnd(20)} → ${label}`);
    });

    console.log(`\n${colors.dim}Total: ${KNOWLEDGE_NODES.length} nodes (${decisions.length} decisions, ${outcomes.length} outcomes)${colors.reset}`);
}

// Command: node <id> - Show full node details
function showNode(nodeId: string) {
    const node = KNOWLEDGE_NODES.find(n => n.id === nodeId);
    if (!node) {
        console.log(`${colors.red}Error: Node '${nodeId}' not found${colors.reset}`);
        console.log(`Available nodes: ${KNOWLEDGE_NODES.map(n => n.id).join(', ')}`);
        return;
    }

    printHeader(`NODE: ${nodeId}`);
    console.log(`${colors.bright}Label:${colors.reset}      ${node.label.replace(/\\n/g, ' ')}`);
    console.log(`${colors.bright}Type:${colors.reset}       ${node.type}`);
    console.log(`${colors.bright}Color:${colors.reset}      ${node.color}`);
    console.log(`${colors.bright}Position:${colors.reset}   x=${node.x}, y=${node.y}`);

    if (node.description) {
        console.log(`\n${colors.bright}Description:${colors.reset}`);
        console.log(`  ${colors.green}why:${colors.reset}      ${node.description.why?.substring(0, 80)}...`);
        console.log(`  ${colors.green}evaluate:${colors.reset} ${node.description.evaluate?.substring(0, 80)}...`);
        console.log(`  ${colors.green}read:${colors.reset}     ${node.description.read}`);
    }

    // Show connected edges
    const inbound = KNOWLEDGE_EDGES.filter(e => e.to === nodeId);
    const outbound = KNOWLEDGE_EDGES.filter(e => e.from === nodeId);

    if (inbound.length > 0) {
        console.log(`\n${colors.bright}Inbound Edges:${colors.reset}`);
        inbound.forEach(e => console.log(`  ← from ${e.from} [${e.label || 'unlabeled'}]`));
    }
    if (outbound.length > 0) {
        console.log(`\n${colors.bright}Outbound Edges:${colors.reset}`);
        outbound.forEach(e => console.log(`  → to ${e.to} [${e.label || 'unlabeled'}]`));
    }
}

// Command: drawer <id> - Show what drawer content renders
function showDrawerContent(nodeId: string) {
    const node = KNOWLEDGE_NODES.find(n => n.id === nodeId);
    if (!node) {
        console.log(`${colors.red}Error: Node '${nodeId}' not found${colors.reset}`);
        return;
    }

    printHeader(`DRAWER CONTENT: ${nodeId}`);

    const desc = node.description as Record<string, unknown>;
    if (!desc) {
        console.log(`${colors.red}No description object found!${colors.reset}`);
        return;
    }

    // Standard sections (always present)
    console.log(`${colors.bright}Standard Sections:${colors.reset}`);
    console.log(`  ✓ why:      ${desc.why ? '✅ Present' : '❌ Missing'}`);
    console.log(`  ✓ evaluate: ${desc.evaluate ? '✅ Present' : '❌ Missing'}`);
    console.log(`  ✓ read:     ${desc.read ? '✅ Present' : '❌ Missing'}`);

    // Bonus sections (node-embedded)
    const bonusSections = ['diagnostics', 'rebundling', 'archetypes', 'asset_engine', 'leverage', 'framework', 'tactic'];
    const presentBonuses: string[] = [];
    const missingBonuses: string[] = [];

    bonusSections.forEach(section => {
        if (desc[section]) {
            presentBonuses.push(section);
        }
    });

    console.log(`\n${colors.bright}Bonus Sections (Node-Embedded):${colors.reset}`);
    if (presentBonuses.length > 0) {
        presentBonuses.forEach(s => {
            const data = desc[s];
            if (Array.isArray(data)) {
                console.log(`  ${colors.green}✅ ${s}${colors.reset} (${data.length} items)`);
            } else if (typeof data === 'object') {
                console.log(`  ${colors.green}✅ ${s}${colors.reset} (object)`);
            } else {
                console.log(`  ${colors.green}✅ ${s}${colors.reset}`);
            }
        });
    } else {
        console.log(`  ${colors.dim}(none)${colors.reset}`);
    }

    // Tactical insights (InfoTerminal logic simulation)
    console.log(`\n${colors.bright}Tactical Insight (from KNOWLEDGE_TACTICAL_INSIGHTS):${colors.reset}`);
    let insight = null;
    let matchReason = '';

    if (['use_transcripts', 'reverse_interview', 'doc_audit'].includes(nodeId)) {
        insight = KNOWLEDGE_TACTICAL_INSIGHTS.sommelier;
        matchReason = 'Matches extraction nodes group';
    } else if (['prompt_library', 'projects_gems', 'skills'].includes(nodeId)) {
        insight = KNOWLEDGE_TACTICAL_INSIGHTS.nurse_navigator;
        matchReason = 'Matches distribution nodes group';
    } else if (nodeId === 'maturity') {
        insight = KNOWLEDGE_TACTICAL_INSIGHTS.coordination_consensus;
        matchReason = 'Exact match on maturity';
    }
    // NOTE: These two are UNREACHABLE in current code (bug!)
    // else if (nodeId === 'use_transcripts') insight = 'asset_engine';
    // else if (nodeId === 'reverse_interview') insight = 'prompt_leverage';

    if (insight) {
        console.log(`  ${colors.magenta}${insight.icon} ${insight.title}${colors.reset}`);
        console.log(`  ${colors.dim}Matched because: ${matchReason}${colors.reset}`);
    } else {
        console.log(`  ${colors.dim}(none - no matching insight for this node)${colors.reset}`);
    }

    // Bug warning
    if (nodeId === 'use_transcripts' || nodeId === 'reverse_interview') {
        console.log(`\n${colors.red}⚠ BUG: This node has unreachable insights in InfoTerminal.tsx!${colors.reset}`);
        if (nodeId === 'use_transcripts') {
            console.log(`  asset_engine insight can never show (sommelier catches first)`);
        } else {
            console.log(`  prompt_leverage insight can never show (sommelier catches first)`);
        }
    }
}

// Command: validate - Check for issues
function validate() {
    printHeader('VALIDATION REPORT');

    let errors = 0;
    let warnings = 0;

    // Check all nodes have required fields
    printSubHeader('Node Structure:');
    KNOWLEDGE_NODES.forEach(node => {
        if (!node.description?.why || !node.description?.evaluate || !node.description?.read) {
            console.log(`  ${colors.red}✗ ${node.id}: Missing required description fields${colors.reset}`);
            errors++;
        }
    });
    if (errors === 0) console.log(`  ${colors.green}✓ All nodes have required description fields${colors.reset}`);

    // Check edge references
    printSubHeader('Edge References:');
    let edgeErrors = 0;
    KNOWLEDGE_EDGES.forEach(edge => {
        const fromExists = KNOWLEDGE_NODES.some(n => n.id === edge.from);
        const toExists = KNOWLEDGE_NODES.some(n => n.id === edge.to);
        if (!fromExists) {
            console.log(`  ${colors.red}✗ Edge ${edge.id}: 'from' node '${edge.from}' doesn't exist${colors.reset}`);
            edgeErrors++;
        }
        if (!toExists) {
            console.log(`  ${colors.red}✗ Edge ${edge.id}: 'to' node '${edge.to}' doesn't exist${colors.reset}`);
            edgeErrors++;
        }
    });
    if (edgeErrors === 0) console.log(`  ${colors.green}✓ All edges reference valid nodes${colors.reset}`);
    errors += edgeErrors;

    // Check for orphaned nodes
    printSubHeader('Orphaned Nodes:');
    const connectedNodes = new Set<string>();
    KNOWLEDGE_EDGES.forEach(e => {
        connectedNodes.add(e.from);
        connectedNodes.add(e.to);
    });
    const orphans = KNOWLEDGE_NODES.filter(n => !connectedNodes.has(n.id));
    if (orphans.length > 0) {
        orphans.forEach(n => {
            console.log(`  ${colors.yellow}⚠ ${n.id}: No edges connect to/from this node${colors.reset}`);
            warnings++;
        });
    } else {
        console.log(`  ${colors.green}✓ No orphaned nodes${colors.reset}`);
    }

    // Summary
    console.log(`\n${colors.bright}Summary:${colors.reset}`);
    console.log(`  Nodes: ${KNOWLEDGE_NODES.length}`);
    console.log(`  Edges: ${KNOWLEDGE_EDGES.length}`);
    console.log(`  Tactical Insights: ${Object.keys(KNOWLEDGE_TACTICAL_INSIGHTS).length}`);
    console.log(`  Errors: ${errors === 0 ? colors.green : colors.red}${errors}${colors.reset}`);
    console.log(`  Warnings: ${warnings === 0 ? colors.green : colors.yellow}${warnings}${colors.reset}`);
}

// Command: insights - List all tactical insights
function listInsights() {
    printHeader('TACTICAL INSIGHTS');

    Object.entries(KNOWLEDGE_TACTICAL_INSIGHTS).forEach(([key, insight]) => {
        console.log(`${insight.icon} ${colors.bright}${insight.title}${colors.reset} (${key})`);
        console.log(`   ${colors.dim}Trigger: ${insight.trigger}${colors.reset}`);
        console.log(`   ${colors.cyan}Concept:${colors.reset} ${insight.concept.substring(0, 70)}...`);
        console.log('');
    });
}

// Command: help
function showHelp() {
    printHeader('KNOWLEDGE CHART CLI');
    console.log('Commands:');
    console.log(`  ${colors.green}nodes${colors.reset}          List all nodes with their IDs and types`);
    console.log(`  ${colors.green}node <id>${colors.reset}      Show full details for a specific node`);
    console.log(`  ${colors.green}drawer <id>${colors.reset}    Show what drawer sections would render for a node`);
    console.log(`  ${colors.green}validate${colors.reset}       Check for data integrity issues`);
    console.log(`  ${colors.green}insights${colors.reset}       List all tactical insights`);
    console.log(`  ${colors.green}help${colors.reset}           Show this help message`);
    console.log('\nExample:');
    console.log(`  npx ts-node scripts/knowledge-cli.ts drawer projects_gems`);
}

// Main router
switch (command) {
    case 'nodes':
        listNodes();
        break;
    case 'node':
        if (!param) {
            console.log(`${colors.red}Error: Please provide a node ID${colors.reset}`);
            console.log(`Usage: knowledge-cli.ts node <id>`);
        } else {
            showNode(param);
        }
        break;
    case 'drawer':
        if (!param) {
            console.log(`${colors.red}Error: Please provide a node ID${colors.reset}`);
            console.log(`Usage: knowledge-cli.ts drawer <id>`);
        } else {
            showDrawerContent(param);
        }
        break;
    case 'validate':
        validate();
        break;
    case 'insights':
        listInsights();
        break;
    case 'help':
    case undefined:
        showHelp();
        break;
    default:
        console.log(`${colors.red}Unknown command: ${command}${colors.reset}`);
        showHelp();
}
