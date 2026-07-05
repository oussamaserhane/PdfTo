{ config, lib, pkgs, ... }:

let
  cfg = config.services.PDFto;
in
{
  options.services.PDFto = {
    enable = lib.mkEnableOption "PDFto - Professional PDF Tools";

    package = lib.mkOption {
      type = lib.types.package;
      default = pkgs.PDFto;
      defaultText = lib.literalExpression "pkgs.PDFto";
      description = "The PDFto package to use.";
    };

    port = lib.mkOption {
      type = lib.types.port;
      default = 3000;
      description = "Port to listen on.";
    };

    openFirewall = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "Whether to open the firewall port.";
    };
  };

  config = lib.mkIf cfg.enable {
    nixpkgs.overlays = [
      (final: prev: {
        PDFto = final.callPackage ./package.nix { };
      })
    ];

    systemd.services.PDFto = {
      description = "PDFto PDF Tools";
      after = [ "network.target" ];
      wantedBy = [ "multi-user.target" ];

      environment = {
        PDFto_PORT = toString cfg.port;
      };

      serviceConfig = {
        ExecStart = "${cfg.package}/bin/PDFto";
        Restart = "on-failure";
        DynamicUser = true;
        RuntimeDirectory = "PDFto";
        StateDirectory = "PDFto";

        # Hardening
        NoNewPrivileges = true;
        ProtectSystem = "strict";
        ProtectHome = true;
        PrivateTmp = true;
        PrivateDevices = true;
        ProtectKernelTunables = true;
        ProtectKernelModules = true;
        ProtectControlGroups = true;
        RestrictSUIDSGID = true;
        MemoryDenyWriteExecute = false;
      };
    };

    networking.firewall.allowedTCPPorts = lib.mkIf cfg.openFirewall [ cfg.port ];
  };
}
