import unittest
import json
from pathlib import Path
from scripts.mcp_server import MCPServer, handle_jsonrpc_request

class TestMCPServer(unittest.TestCase):
    def setUp(self):
        self.repo_root = Path(__file__).resolve().parent.parent
        self.server = MCPServer(repo_root=self.repo_root)

    def test_initialize(self):
        req = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "initialize",
            "params": {
                "protocolVersion": "2024-11-05",
                "capabilities": {},
                "clientInfo": {"name": "test-client", "version": "1.0.0"}
            }
        }
        res = handle_jsonrpc_request(req, self.server)
        self.assertEqual(res["jsonrpc"], "2.0")
        self.assertEqual(res["id"], 1)
        self.assertIn("serverInfo", res["result"])
        self.assertEqual(res["result"]["serverInfo"]["name"], "ai-coding-skills-matrix")
        self.assertIn("capabilities", res["result"])

    def test_tools_list(self):
        req = {"jsonrpc": "2.0", "id": 2, "method": "tools/list", "params": {}}
        res = handle_jsonrpc_request(req, self.server)
        tools = res["result"]["tools"]
        tool_names = [t["name"] for t in tools]
        expected_tools = ["search_skills", "get_skill", "list_presets", "get_upstream_metrics", "install_skill"]
        for t in expected_tools:
            self.assertIn(t, tool_names)

    def test_tool_search_skills(self):
        req = {
            "jsonrpc": "2.0",
            "id": 3,
            "method": "tools/call",
            "params": {
                "name": "search_skills",
                "arguments": {"query": "writing-plans"}
            }
        }
        res = handle_jsonrpc_request(req, self.server)
        self.assertFalse(res.get("isError", False))
        text = res["result"]["content"][0]["text"]
        self.assertIn("writing-plans", text)

    def test_tool_get_skill(self):
        req = {
            "jsonrpc": "2.0",
            "id": 4,
            "method": "tools/call",
            "params": {
                "name": "get_skill",
                "arguments": {"skill_name": "writing-plans"}
            }
        }
        res = handle_jsonrpc_request(req, self.server)
        self.assertFalse(res.get("isError", False))
        text = res["result"]["content"][0]["text"]
        self.assertIn("writing-plans", text)
        self.assertIn("superpowers", text)

    def test_tool_list_presets(self):
        req = {
            "jsonrpc": "2.0",
            "id": 5,
            "method": "tools/call",
            "params": {
                "name": "list_presets",
                "arguments": {}
            }
        }
        res = handle_jsonrpc_request(req, self.server)
        text = res["result"]["content"][0]["text"]
        self.assertIn("superpowers", text)
        self.assertIn("gstack", text)

    def test_tool_get_upstream_metrics(self):
        req = {
            "jsonrpc": "2.0",
            "id": 6,
            "method": "tools/call",
            "params": {
                "name": "get_upstream_metrics",
                "arguments": {"repo": "agentskills/agentskills"}
            }
        }
        res = handle_jsonrpc_request(req, self.server)
        text = res["result"]["content"][0]["text"]
        self.assertIn("agentskills/agentskills", text)
        self.assertIn("27", text)

    def test_resources_list_and_read(self):
        # List
        req_list = {"jsonrpc": "2.0", "id": 7, "method": "resources/list", "params": {}}
        res_list = handle_jsonrpc_request(req_list, self.server)
        uris = [r["uri"] for r in res_list["result"]["resources"]]
        self.assertIn("skills://matrix", uris)

        # Read
        req_read = {
            "jsonrpc": "2.0",
            "id": 8,
            "method": "resources/read",
            "params": {"uri": "skills://matrix"}
        }
        res_read = handle_jsonrpc_request(req_read, self.server)
        contents = res_read["result"]["contents"]
        self.assertEqual(contents[0]["uri"], "skills://matrix")
        self.assertIn("AI Coding Skills", contents[0]["text"])

if __name__ == "__main__":
    unittest.main()
