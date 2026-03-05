import { EC2Client, ModifySecurityGroupRulesCommand } from "@aws-sdk/client-ec2";
import config from "../config";
// Configuración del cliente AWS usando variables de entorno en Railway
const client = new EC2Client({
  region: config.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: "AKIAXWQOMBINBE7ZCJWO",
    secretAccessKey: "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"
  }
});

// Mapeo de usuarios a IDs de reglas de seguridad de tus capturas
const SECURITY_RULES = {
  'PAULA': 'sgr-00f7eff021c8bfa6c',
  'SILVANA': 'sgr-09f5f59023b4b6385',
  'CESAR': 'sgr-06d833b3d59afd765',
  'YORMAN': 'sgr-0be2ba4d9cf9e3afa',
  'KARINA': 'sgr-00635c4bed1f0a190',
  'CARLOS': 'sgr-046d0b18c35dd16a0'
};

export const updateIpAccess = async (req, res) => {
  try {
    const { userName } = req.body;
    const ruleId = SECURITY_RULES[userName?.toUpperCase()];

    if (!ruleId) {
      return res.status(400).json({ message: "Usuario no configurado en AWS" });
    }

    // Detectar la IP real a través del proxy de Railway
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const cleanIp = userIp.split(',')[0].trim();

    const command = new ModifySecurityGroupRulesCommand({
      GroupId: "sg-03c85c83be17a7205", 
      SecurityGroupRules: [{
        SecurityGroupRuleId: ruleId,
        SecurityGroupRule: {
          IpProtocol: 'tcp',
          FromPort: 1433,
          ToPort: 1433,
          CidrIpv4: `${cleanIp}/32`,
          Description: `Web Auth: ${userName}`
        }
      }]
    });

    await client.send(command);
    
    res.json({
      success: true,
      message: `Acceso habilitado para ${userName}`,
      ip: cleanIp
    });

  } catch (error) {
    res.status(500).send(error.message);
  }
};